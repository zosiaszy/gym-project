# In powershell we trust

if ((Get-Location) -notlike "*\backend"){
	Write-Output "Odpal z poziomu \backend"
	exit
}

python -m venv .\.venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python gym/manage.py makemigrations
python gym/manage.py migrate
Write-Output "TWORZENIE ADMINA"
python gym/manage.py createsuperuser
python gym/manage.py runserver