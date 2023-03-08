# Generated by Django 4.0.3 on 2023-03-08 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_appointment_reason'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=200, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='color',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='import_vin',
            field=models.CharField(max_length=17, unique=True),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='year',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='technician',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]