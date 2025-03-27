# Generated by Django 5.1.4 on 2025-03-27 17:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_order_location_alter_order_submission_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='vendor',
            field=models.CharField(default='No vendor', max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='submission_date',
            field=models.DateField(default=datetime.date(2025, 3, 27)),
        ),
    ]
