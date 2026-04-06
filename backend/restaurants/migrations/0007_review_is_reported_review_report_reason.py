from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0006_merge_20260405_1806'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='is_reported',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='review',
            name='report_reason',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
