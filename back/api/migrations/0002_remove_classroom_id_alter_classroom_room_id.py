# Generated by Django 4.1.2 on 2022-12-25 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='classroom',
            name='id',
        ),
        migrations.AlterField(
            model_name='classroom',
            name='room_id',
            field=models.IntegerField(default=None, primary_key=True, serialize=False),
        ),
    ]
