package com.example.EventPlace.service.implement;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.domain.Role;
import com.example.EventPlace.domain.User;
import com.example.EventPlace.dto.ChangePasswordBody;
import com.example.EventPlace.dto.EventPlaceDTO;
import com.example.EventPlace.dto.UserDTO;
import com.example.EventPlace.email.EmailSender;
import com.example.EventPlace.emailToken.ConfirmationToken;
import com.example.EventPlace.emailToken.ConfirmationTokenRespository;
import com.example.EventPlace.emailToken.ConfirmationTokenService;
import com.example.EventPlace.repository.CityRepository;
import com.example.EventPlace.repository.EventPlaceRepository;
import com.example.EventPlace.repository.RolRepository;
import com.example.EventPlace.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class UserImplement implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private ConfirmationTokenRespository confirmationTokenRespository;

    @Autowired
    private EventPlaceRepository eventPlaceRepository;

    @Autowired
    @Lazy
    private EventPlaceImplement eventPlaceImplement;

    @Autowired
    private CityImplement cityImplement;

    @Autowired
    private CityRepository cityRepository;


    private static final Logger logger = LogManager.getLogger(UserImplement.class);



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> searchedUser = userRepository.findByUsername(username);
        if (searchedUser.isPresent()) {
            logger.info("Someone logged in");
            return searchedUser.get();
        }
        logger.error("Someone tried to log in ");
        throw new UsernameNotFoundException("Error. User with the email " + username + " was not found");
    }

    public UserDTO userToUserDTO(User user)
    {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setLastName(user.getLastName());
        userDTO.setUsername(user.getUsername());
        userDTO.setLocation(user.getLocation());
        userDTO.setRole(user.getRole());
        userDTO.setNationalID(user.getNationalID());
        userDTO.setProfileImage(user.getProfileImage());
        if(user.getCity() != null)
        {
        userDTO.setCity(cityImplement.cityToCityDTO(user.getCity()));
        }

        Set<EventPlaceDTO> eventPlaceDTOS = new HashSet<>();
        for (EventPlace eventPlace:user.getListFavorites()) {
            eventPlaceDTOS.add(eventPlaceImplement.eventPlaceAEventPlaceDTO(eventPlace));
        }
        userDTO.setListFavorites(eventPlaceDTOS);
        return userDTO;
    }

    public User userDTOToUser(UserDTO userDTO1)
    {
        User user = new User();
        user.setId(userDTO1.getId());
        user.setName(userDTO1.getName());
        user.setLastName(userDTO1.getLastName());
        user.setUsername(userDTO1.getUsername());
        user.setLocation(userDTO1.getLocation());
        user.setRole(userDTO1.getRole());
        return user;
    }

    @Transactional
    public String changeUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User authenticatedUser = (User) authentication.getPrincipal();

        Long userId = authenticatedUser.getId();

        Role authenticatedUserRole = authenticatedUser.getRole();

        if (authenticatedUserRole.getName().equals("BASIC")) {
            authenticatedUser.setRole(rolRepository.findByName("OWNER"));
            User userWasChanged = userRepository.save(authenticatedUser);
            return userWasChanged.getRole().getName();
        } else {
            authenticatedUser.setRole(rolRepository.findByName("BASIC"));
            User userWasChanged = userRepository.save(authenticatedUser);
            return userWasChanged.getRole().getName();
        }
    }

    public void addFavorite(Long eventPlaceId, Long userId)
    {
        User user = userRepository.findById(userId).get();
        Set<EventPlace> eventPlaceSet = user.getListFavorites();
        eventPlaceSet.add(eventPlaceRepository.findById(eventPlaceId).get());
        user.setListFavorites(eventPlaceSet);
        userRepository.save(user);
    }

    public void deleteFromFavorites(Long eventPlaceId, Long userId)
    {
        User user = userRepository.findById(userId).get();
        Set<EventPlace> eventPlaceSet = user.getListFavorites();
        EventPlace eventPlace = eventPlaceRepository.findById(eventPlaceId).get();
        eventPlaceSet.remove(eventPlace);
        user.setListFavorites(eventPlaceSet);
        userRepository.save(user);
    }

    public void uploadImageProfile(MultipartFile file, Long id) {
        User user = userRepository.findById(id).get();
        String accessKey = "*";
        String secretKey = "*";
        String region = "us-east-2";
        String bucketName = "*";

        String uniqueFilename = "profile/" + id + ".png";

        String s3Url = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + uniqueFilename;

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(region) // Reemplaza con la región de tu bucket
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();

        try {
            byte[] bytes = file.getBytes();
            ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(bytes.length);
            metadata.setContentType("profile/png");

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFilename, inputStream, metadata);
            s3Client.putObject(putObjectRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        user.setProfileImage(s3Url);
        userRepository.save(user);
    }

    public UserDTO deleteImage(Long id)
    {
        User user = userRepository.findById(id).get();
        user.setProfileImage(null);
        return userToUserDTO(userRepository.save(user));
    }


    @Transactional
    public String createUser(User user) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(), LocalDateTime.now().plusHours(48), user);
        if(user.getCity() != null)
        {
            user.setCity(cityRepository.findByNameCityAndStateAndCountry(user.getCity().getNameCity(), user.getCity().getState(), user.getCity().getCountry()).get());
        }
        Role basicRole = rolRepository.findByName("BASIC");
        if (basicRole != null) {
            user.setRole(basicRole);
        } else {
            throw new RuntimeException("That role was not found");
        }
        BCryptPasswordEncoder cifrador = new BCryptPasswordEncoder();
        String passwordEncriptada = cifrador.encode(user.getPassword());
        user.setPassword(passwordEncriptada);
        user.setEnabled(false);

        User savedUser = userRepository.save(user);

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        String link = "http://3.135.182.10:8080/confirmToken/" + token;
        emailSender.send(user.getUsername(), buildEmail(user.getName(), link));


        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                ConfirmationToken expiredToken = confirmationTokenService.getToken(token).get();
                User searchedUser = userRepository.findById(savedUser.getId()).get();
                if (expiredToken != null && expiredToken.getExpiresAt().isBefore(LocalDateTime.now()) && searchedUser.getEnabled() == false) {
                    confirmationTokenRespository.deleteById(expiredToken.getId());
                }
            }
        }, 48 * 60 * 60 * 1000);

        return "The user was created.";
    }

    public Set<EventPlaceDTO> findFavorites(Long userId)
    {
        Set<EventPlaceDTO> eventPlaceDTOS = new HashSet<>();
        User user = userRepository.findById(userId).get();
        for (EventPlace eventPlace:user.getListFavorites()) {
            eventPlaceDTOS.add(eventPlaceImplement.eventPlaceAEventPlaceDTO(eventPlace));
        }
        return eventPlaceDTOS;
    }

    public List<UserDTO> findAllUsers() {
        List<UserDTO> userDTOS = new ArrayList<>();
        logger.info("Someone searched all users");
        List<User> userList = userRepository.findAll();


        for (User user : userList) {
            userDTOS.add(userToUserDTO(user));
        }

        return userDTOS;
    }

    public UserDTO findUserById(Long id, String username) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null && user.getUsername().equals(username)) {
            return userToUserDTO(user);
        } else {
            return null;
        }
    }


    public Optional<User> updateUser(User user)
    {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(), LocalDateTime.now().plusHours(48), user);
        Role role = rolRepository.findByName(user.getRole().getName());
       if(userRepository.findById(user.getId()).isPresent())
       {
           if(user.getCity() != null )
           {
           user.setCity(cityRepository.findByNameCityAndStateAndCountry(user.getCity().getNameCity(), user.getCity().getState(), user.getCity().getCountry()).get());
           }
           if(user.getPassword() == null)
           {
               user.setPassword(userRepository.findById(user.getId()).get().getPassword());
           }
           if (!userRepository.findById(user.getId()).get().getUsername().equals(user.getUsername()))
           {
               user.setEnabled(false);
               User savedUser = userRepository.save(user);
               confirmationTokenService.saveConfirmationToken(confirmationToken);
               String link = "http://3.135.182.10:8080/confirmToken/" + token;
               emailSender.send(user.getUsername(), buildEmail(user.getName(), link));

               Timer timer = new Timer();
               timer.schedule(new TimerTask() {
                   @Override
                   public void run() {
                       ConfirmationToken expiredToken = confirmationTokenService.getToken(token).get();
                       User searchedUser = userRepository.findById(savedUser.getId()).get();
                       if (expiredToken != null && expiredToken.getExpiresAt().isBefore(LocalDateTime.now()) && searchedUser.getEnabled() == false) {
                           confirmationTokenRespository.deleteById(expiredToken.getId());
                       }
                   }
               }, 48 * 60 * 60 * 1000);


           }
           else
           {
               user.setEnabled(true);
           }
           user.setRole(role);
           return Optional.of(userRepository.save(user));
       }
       return Optional.empty();
    }

    public void sendConfirmationMailAgain(String username)
    {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(), LocalDateTime.now().plusHours(48), userRepository.findByUsername(username).get());
        BCryptPasswordEncoder cifrador = new BCryptPasswordEncoder();
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        String link = "http://3.135.182.10:8080/confirmToken/" + token;
        emailSender.send(username, buildEmail(userRepository.findByUsername(username).get().getName(), link));

        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                ConfirmationToken expiredToken = confirmationTokenService.getToken(token).get();
                User searchedUser = userRepository.findById(userRepository.findByUsername(username).get().getId()).get();
                if (expiredToken != null && expiredToken.getExpiresAt().isBefore(LocalDateTime.now()) && searchedUser.getEnabled() == false) {
                    confirmationTokenRespository.deleteById(expiredToken.getId());
                }
            }
        }, 48 * 60 * 60 * 1000);
    }


    @Transactional
    public String confirmToken(String token) {

        ConfirmationToken confirmationToken = confirmationTokenService.getToken(token).orElseThrow(() ->
                new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        User user = confirmationToken.getUser();
        confirmationTokenService.setConfirmedAt(token);
        userRepository.enableUser(user.getUsername());
        logger.info("confirmation token arrived");

        String html = "<!DOCTYPE html>\n"
                + "<html lang=\"en\">\n"
                + "<head>\n"
                + "    <meta charset=\"UTF-8\">\n"
                + "    <title>Email Confirmation</title>\n"
                + "    <style>\n"
                + "        body {\n"
                + "            font-family: Arial, sans-serif;\n"
                + "            background-color: #1F1A1B;\n"
                + "            display: flex;\n"
                + "            justify-content: center;\n"
                + "            align-items: center;\n"
                + "            height: 100vh;\n"
                + "            flex-direction: column;\n"
                + "        }\n"
                + "        h1 {\n"
                + "            color: #EE5D1A;\n"
                + "            background-color: #333333;\n"
                + "            width: 50vw;\n"
                + "            height: 5vw;\n"
                + "            display: flex;\n"
                + "            flex-direction: column;\n"
                + "            justify-content: center;\n"
                + "            align-items: center;\n"
                + "            border-radius: 1vw;\n"
                + "        }\n"
                + "        p {\n"
                + "            color: white;\n"
                + "            background-color: #333333;\n"
                + "            width: 35vw;\n"
                + "            height: 3vw;\n"
                + "            display: flex;\n"
                + "            flex-direction: column;\n"
                + "            justify-content: center;\n"
                + "            align-items: center;\n"
                + "            border-radius: 0.5vw;\n"
                + "        }\n"                + "       "
                + " img {\n"
                + "            width: 25vw;\n"
                + "        }\n"
                + "        /* Otros estilos CSS */\n"
                + "        /* ... */\n"
                + "    </style>\n"
                + "</head>\n"
                + "<body>\n"
                + "    <h1>Your account is confirmed!</h1>\n"
                + "    <p>Thank you for confirming your email.</p>\n"
                + "    <p>Your account is now active, you can login now! <a href=\"*\">Click here to login</a></p>\n"
                + "    <img src=\"*\">\n"
                + "</body>\n"
                + "</html>";

        return html;

    }


    private String buildEmail(String name, String link) {


        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email in eventPlace! </span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#EE5D1A\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering in eventPlace! Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 48 hours, if you do not confirm your account you will have to register again. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }


    private String buildEmail2(String name, String link) {


        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Change your password in eventPlace! </span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#EE5D1A\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Click on the below link to change your password </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Change now!</a> </p></blockquote>\n Link will expire in 10 minutes<p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }


    public void sendResetPasswordEmail(String username)
    {
        User user = userRepository.findByUsername(username).get();
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(10), user);
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        String link = "http://3.135.182.10:8080/changePassword/" + token;
        emailSender.send(username, buildEmail2(user.getName(), link));
    }

    @Transactional
    public void changePassword(ChangePasswordBody changePasswordBody)
    {
        ConfirmationToken confirmationToken = confirmationTokenService.getToken(changePasswordBody.getToken()).orElseThrow(() ->
                new IllegalStateException("token not found"));

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        User user = confirmationToken.getUser();
        confirmationTokenService.setConfirmedAt(changePasswordBody.getToken());
        BCryptPasswordEncoder cifrador = new BCryptPasswordEncoder();
        String passwordEncriptada = cifrador.encode(changePasswordBody.getPassword());
        user.setPassword(passwordEncriptada);
        logger.info("confirmation token for changing password arrived");
    }

    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            ConfirmationToken confirmationToken = user.getConfirmationToken();
            if (confirmationToken != null) {
                confirmationTokenRespository.delete(confirmationToken);
            }
            user.setConfirmationToken(null);
            user.setRole(null);
            userRepository.deleteById(id);
        }
    }


    public int enableUser(String userName) {
        return userRepository.enableUser(userName);
    }
}
