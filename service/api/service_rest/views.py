# from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods
# from common.json import ModelEncoder
# import json
# from .models import Appointment, AutomobileVO, Technician


# # Create your views here.
# class TechnicianDetailEncoder(ModelEncoder):
#     model = Technician
#     properties = [
#         "id",
#         "name",
#         "employee_number",
#     ]


# class AppointmentDetailEncoder(ModelEncoder):
#     model = Appointment
#     properties = [
#         "id",
#         "vin",
#         "customer_name",
#         "reason",
#         "is_finifshed",
#         "is_vip",
#     ]

#     def get_extra_data(self, o):
#         return {"technician": o.technician.name}


# class AppointmentListEncoder(ModelEncoder):
#     model = Appointment
#     properties = [
#         "id",
#         "vin",
#         "customer_name",
#         "reason",
#         "is_finifshed",
#         "is_vip",
#     ]

#     def get_extra_data(self, o):
#         return {"technician": o.technician.name}


# def api_list_technicians(request):
#     pass


# @require_http_methods(["GET", "POST"])
# def api_list_appointments(request):
#     if request.method == "GET":
#         appointments = Appointment.objects.all()
#         return JsonResponse(
#             {"appointments": appointments},
#             encoder=AppointmentListEncoder,
#         )


# @require_http_methods(["GET", "POST"])
# def api_appointment(request, id):
#     if request.method == "GET":
#         try:
#             appointment = Appointment.objects.get(pk=id)
#             return JsonResponse(
#                 appointment,
#                 encoder=AppointmentDetailEncoder,
#                 safe=False,
#             )
#         except Appointment.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid Appoinment ID"},
#                 status=400,
#             )


# @require_http_methods(["GET", "POST"])
# def api_list_technicians(request):
#     if request.method == "GET":
#         technicians = Technician.objects.all()
#         return JsonResponse(
#             {"technicians": technicians},
#             encoder=TechnicianDetailEncoder,
#         )
#     else:  # POST
#         content = json.loads(request.body)

#         technician = Technician.objects.create(**content)
#         return JsonResponse(
#             technician,
#             encoder=TechnicianDetailEncoder,
#             safe=False,
#         )

from django.shortcuts import render
from .models import Technician, Appointment, AutomobileVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer_name",
        # "date",
        # "time",
        "reason",
        "is_finished",
        "is_vip",
    ]

    def get_extra_data(self, o):
        return {"technician": o.technician.name}


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer_name",
        # "date",
        # "time",
        "reason",
        "is_finished",
        "is_vip",
        "technician",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:  # POST
        content = json.loads(request.body)

        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician href"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_appointment(request, id):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    if request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianDetailEncoder,
        )
    else:
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST", "DELETE"])
def api_show_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":  # DELETE
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=pk)

            props = ["name"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET"])
def api_list_automobiles(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        auto_list = []
        for auto in autos:
            values = {
                "import_href": auto.import_href,
                "import_vin": auto.import_vin,
                "color": auto.color,
                "year": auto.year,
            }
            auto_list.append(values)
        return JsonResponse({"autos": auto_list})
