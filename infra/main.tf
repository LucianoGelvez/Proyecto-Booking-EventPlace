provider "aws" {
  region  = "us-east-2"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "eventplace-instance" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "keys"

  vpc_security_group_ids = [aws_security_group.eventplace-security-group.id]

  tags = {
    Name = "eventplace-instance"
  }
}

resource "aws_security_group" "eventplace-security-group" {
  name        = "eventplace-security-group"
  description = "Security group for Eventplace instance"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_eip" "eventplace-eip" {
  instance = aws_instance.eventplace-instance.id
}



resource "aws_s3_bucket" "bucket1" {
  bucket = "eventplace-bucket-frontend"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket1_public_access_block" {
  bucket = aws_s3_bucket.bucket1.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls  = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket1_policy" {
  bucket = aws_s3_bucket.bucket1.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::${aws_s3_bucket.bucket1.id}/*"
      ]
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "bucket2" {
  bucket = "eventplace-bucket-images"

  tags = {
    Name        = "My bucket of images"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket2_public_access_block" {
  bucket = aws_s3_bucket.bucket2.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls  = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket2_policy" {
  bucket = aws_s3_bucket.bucket2.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::${aws_s3_bucket.bucket2.id}/*"
      ]
    }
  ]
}
EOF
}