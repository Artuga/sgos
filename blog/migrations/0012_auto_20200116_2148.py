# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2020-01-17 03:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0011_auto_20200116_2144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pago',
            name='alumno',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='blog.Alumno'),
        ),
    ]
