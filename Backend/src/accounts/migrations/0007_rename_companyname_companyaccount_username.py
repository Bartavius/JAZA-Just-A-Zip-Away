# Generated by Django 5.1.6 on 2025-02-09 00:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_companyaccount_id_alter_useraccount_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='companyaccount',
            old_name='companyName',
            new_name='username',
        ),
    ]
