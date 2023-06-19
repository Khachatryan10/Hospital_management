from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
import uuid


# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, phone_number, password, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        
        if not password:
            raise ValueError("Password is required")
        
        if not first_name:
            raise ValueError("First name is required")
        
        if not last_name:
            raise ValueError("Last name is required")
        
        if not phone_number:
            raise ValueError("Phone number is required")
        
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name,
                          last_name=last_name, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user_account(self, email, first_name, last_name, phone_number, password, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self.create_user(email, first_name, last_name, phone_number, password, **extra_fields)
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=64, null=False)
    last_name = models.CharField(max_length=64, null=False)
    phone_number = models.CharField(max_length=100, null=False)
    role = models.CharField(max_length=20, null=False)
    speciality = models.CharField(max_length=40, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"

    REQUIRED_FIELDS = ["first_name", "last_name", "phone_number", "role","password"]

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def get_full_name(self):
        return self.first_name
    
    def get_short_name(self):
        return self.first_name or self.email.split("@")[0]
    
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "role": self.role,
            "phone_number": self.phone_number,
            "speciality": self.speciality
        }

# couldn't add foreign key user then serialize that's why changeed to charfields

class Schedule(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    doctor_name = models.CharField(max_length=64)
    patient_name = models.CharField(max_length=64)
    doctor_last_name = models.CharField(max_length=100)
    patient_last_name = models.CharField(max_length=100)
    doctor_email = models.CharField(max_length=100)
    patient_email = models.CharField(max_length=100)
    doctor_id = models.CharField(max_length=50)
    week_day = models.CharField(max_length=30)
    working_day = models.BooleanField(default=True)
    date = models.CharField(max_length=20) 
    time = models.TimeField()

    def serialize(self):
        return {
            "id": self.id,
            "doctor_name": self.doctor_name,
            "patient_name": self.patient_name,
            "doctor_last_name": self.doctor_last_name,
            "patient_last_name": self.patient_last_name,
            "doctor_email": self.doctor_email,
            "doctor_id": self.doctor_id,
            "week_day": self.week_day,
            "working_day": self.working_day,
            "date": self.date,
            "time": self.time
        }

class MedicalHistory(models.Model):
    patient_email = models.CharField(max_length=80, primary_key=True)
    doctor_email = models.CharField(max_length=80)
    doctor_name = models.CharField(max_length=64)
    doctor_last_name = models.CharField(max_length=100)
    patient_name = models.CharField(max_length=64)
    patient_last_name = models.CharField(max_length=100)
    patient_birth_date = models.CharField(max_length=20)
    medical_information = models.CharField(max_length=500)
    
    def serialize(self):
        return {
            "patient_email": self.patient_email,
            "doctor_email": self.doctor_email,
            "doctor_name": self.doctor_name,
            "doctor_last_name": self.doctor_last_name,
            "patient_name": self.patient_name,
            "patient_last_name": self.patient_last_name,
            "patient_birth_date": self.patient_birth_date,
            "medical_information": self.medical_information
        }
    
    # Whe ndoctor updates the med history delete notif as sent
    
class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.CharField(max_length=80)
    sender_name = models.CharField(max_length=64)
    sender_last_name = models.CharField(max_length=100)
    receiver = models.CharField(max_length=80)
    content = models.CharField(max_length=500)
    date = models.CharField(max_length=20)
    time = models.CharField(max_length=8)

    def serialize(self):
        return {
            "id": self.id,
            "sender": self.sender,
            "sender_name": self.sender_name,
            "sender_last_name": self.sender_last_name,
            "receiver": self.receiver,
            "content": self.content,
            "date": self.date,
            "time": self.time,
        }


