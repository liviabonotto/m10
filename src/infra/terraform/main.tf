terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region     = var.region
  access_key = var.access_key
  secret_key = var.secret_key
  token      = var.token  # Add this line
}


resource "aws_instance" "example" {
  ami           = "ami-04ff98ccbfa41c9ad"
  instance_type = "t2.micro"

  tags = {
    Name = "ExampleInstance"
  }
}

