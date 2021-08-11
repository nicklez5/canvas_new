# Generated by Django 3.1.6 on 2021-08-10 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('assignments', '0001_initial'),
        ('lectures', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('assignments', models.ManyToManyField(blank=True, to='assignments.Assignment')),
                ('lectures', models.ManyToManyField(blank=True, to='lectures.Lecture')),
            ],
            options={
                'db_table': 'course',
                'ordering': ['name'],
            },
        ),
    ]
