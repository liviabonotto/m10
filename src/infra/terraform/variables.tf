variable "region" {
  description = "AWS Region"
  default     = "us-east-1"
}

variable "access_key" {
  description = "AWS Access Key"
}

variable "secret_key" {
  description = "AWS Secret Key"
}
variable "token" {
  description = "AWS Session Token"
  type        = string
}

