Biblioteca Personală

Aceasta este o aplicație web pentru gestionarea unei biblioteci personale, care permite adăugarea de cărți și recenzii.

Structura proiectului
- Backend: API RESTful implementat cu Node.js, Express și SQLite.
- Frontend: Aplicație SPA realizată cu React.js.

---

Cerințe pentru rulare
1. Node.js (v14+)
2. npm (inclus în Node.js)
3. SQLite (pentru baza de date locală)

---

Instalare și rulare

 1. Clonează proiectul
Clonează acest proiect din GitHub:

git clone https://github.com/AdiGusa/BibliotecaPersonala/
cd proiect

---

Configurare backend

cd biblioteca-backend
npm install
node server.js
(va rula pe localhost:5000)

---

Configurare frontend
cd biblioteca-frontend
npm install
npm start

---

Funcționalități
Adăugarea de cărți cu titlu, autor, descriere, ISBN și imagine.
Vizualizarea detaliilor unei cărți.
Adăugarea de recenzii pentru cărți.
Editarea și ștergerea cărților sau recenziilor.

---

Testare API

Pentru testarea API-ului REST, folosește Postman sau cURL. Endpoint-urile API sunt disponibile în backend/routes.
