# Generated by Django 5.1.6 on 2025-02-09 08:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_companyaccount_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='useraccount',
            options={'permissions': [('apply_post', 'can apply post')]},
        ),
    ]
