from django.db import models

# Create your models here.

class song(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    artist = models.CharField(max_length=80)
    song_file = models.FileField(upload_to='static/songs/')

    def __str__(self):
        return self.name