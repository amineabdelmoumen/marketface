import React, {useState} from 'react';

const Signup = () => {
  const [titre, setTitre] = useState('')
  const [poste, setPoste] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [phone, setPhone] = useState('')

  return (
  <div className="container mt-5">
    <div className="text-center">
      <h1 className="text-secondary">Accédez au marché en temps réel!</h1>
      <p className="text-primary">Ne ratez pas aucune opportunité d'affaires! Créez votre compte dès aujourd'hui!</p>
    </div>
    <div className="row">
      <div className="col-md-6 d-flex justify-content-center align-items-start">
        <img src="https://via.placeholder.com/300" alt=""/>
      </div>
      <div className="col-md-6">
        <div className="form-group mb-4">
          <select name="titre" className="form-control rounded-pill border-0" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)}>
            <option value="m">M</option>
            <option value="mme">Mme</option>
            <option value="dr">Dr</option>
            <option value="pr">Pr</option>
          </select>
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <div className="form-group">
              <input type="text" className="form-control rounded-pill border-0" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <input type="text" className="form-control rounded-pill border-0" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="form-group mb-4">
          <select name="poste" className="form-control rounded-pill border-0" placeholder="Poste Occupé" value={poste} onChange={(e) => setPoste(e.target.value)}>
            <option value="directeur_general">Directeur général</option>
            <option value="directeur_commercial">Directeur Commercial</option>
            <option value="directeur_marketing">Directeur Marketing</option>
            <option value="directeur_finance">Directeur Finance</option>
            <option value="directeur_achat">Directeur Achat</option>
            <option value="directeur_communication">Directeur Communication</option>
            <option value="directeur_informatique">Directeur Informatique</option>
            <option value="directeur_ressource_humaine">Directeur Ressource humaine</option>
            <option value="directeur_technique">Directeur Technique</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <input type="text" className="form-control rounded-pill border-0" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group mb-4">
          <input type="text" className="form-control rounded-pill border-0" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="form-group mb-4">
          <input type="password" className="form-control rounded-pill border-0" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group mb-4">
          <input type="password" className="form-control rounded-pill border-0" placeholder="Confirmer votre mot de passe" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        </div>
        <div className="d-flex flex-column align-items-end mb-5">
          <p className="small">En cliquant sur s'inscrire, vous acceptez nos <a href="#">Conditions d'utilisation</a></p>
          <button className="btn btn-success text-white rounded-pill px-4">Envoyer</button>
        </div>
      </div>
    </div>
  </div>
  );

};

export default Signup;
