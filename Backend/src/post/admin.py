from django.contrib import admin

# Register your models here.
from .models import CompanyPost, Linker

class LinkerInline(admin.TabularInline):
    model = Linker

class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('post_time', 'user')
    inlines = [LinkerInline]

admin.site.register(CompanyPost,PostAdmin)