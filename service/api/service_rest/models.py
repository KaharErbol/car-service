# from django.db import models
# from django.urls import reverse
# # Create your models here.


# class AutomobileVO(models.Model):
#     import_vin = models.CharField(max_length=200, unique=True)
#     color = models.CharField(max_length=50)
#     year = models.PositiveSmallIntegerField()


# class Technician(models.Model):
#     name = models.CharField(max_length=255)
#     employee_number = models.PositiveIntegerField(unique=True)

#     def __str__(self):
#         return self.name

#     def get_api_url(self):
#         return reverse("api_list_technicians", kwargs={"pk": self.id})


# class Appointment(models.Model):
#     customer_name = models.CharField(max_length=200)
#     vin = models.CharField(max_length=17)
#     reason = models.CharField(max_length=200)
#     date = models.DateTimeField(null=True, blank=True)
#     time = models.DateTimeField(null=True, blank=True)
#     is_finished = models.BooleanField(default=False)
#     is_vip = models.BooleanField(default=False)

#     technician = models.ForeignKey(
#         Technician,
#         related_name="appointments",
#         on_delete=models.CASCADE,
#     )

#     def get_api_url(self):
#         return reverse("api_appointment", kwargs={"pk": self.id})

#     # def __str__(self):
#     #     return self.id

from django.db import models
from django.urls import reverse
# Create your models here.


class AutomobileVO(models.Model):
    import_vin = models.CharField(max_length=17, unique=True)
    color = models.CharField(max_length=50, null=True)
    year = models.PositiveSmallIntegerField(null=True)
    import_href = models.CharField(max_length=200, null=True, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.id})

    def __str__(self):
        return self.name


class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    customer_name = models.CharField(max_length=200)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )
    reason = models.CharField(max_length=1000)
    is_vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.id})

    def __str__(self):
        return self.vin
