# Generated by Django 4.1.2 on 2022-11-26 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='username',
            field=models.TextField(blank=True, null=True),
        ),
    ]
