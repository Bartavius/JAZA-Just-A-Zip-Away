# Generated by Django 5.1.6 on 2025-02-09 06:42

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_alter_companypost_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='companypost',
            name='start_time',
            field=models.TimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
