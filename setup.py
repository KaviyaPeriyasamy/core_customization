from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in core_customization/__init__.py
from core_customization import __version__ as version

setup(
	name='core_customization',
	version=version,
	description='Core customizations',
	author='vps',
	author_email='criogroups@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
