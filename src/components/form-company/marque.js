import React, {useState} from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch, useSelector} from "react-redux";
import {setMarque} from "../../store/profileSlice";

const categories = [
  'Produits chimiques',
  'Peintures et vernis',
  'Cosmétique et substance nettoyante',
  'Huiles et lubrifiants industriels',
  'Médicaments',
  'Métaux communs et alliage',
  'Machines-outils',
  'Outils manuels',
  'Appareils électriques et scientifiques',
  'Appareils médicaux',
  'Appareil de contrôle de l\'environnement',
  'Véhicules',
  'Armes à feu',
  'Bijoux',
  'Instruments de musique',
  'Papeterie',
  'Articles en caoutchouc',
  'Maroquinerie',
  'Matériaux de construction',
  'Meubles',
  'Articles ménagers et verre',
  'Cordes et fibres',
  'Fils',
  'Tissu',
  'Vêtements et chaussures',
  'Fantaisie',
  'Tapis et revêtement de sol',
  'Jouets et articles de sport',
  'Viande et aliments transformés',
  'Aliment de Base',
  'Produits agricoles',
  'Boisson légère y compris la bière',
  'Boissons alcoolisées',
  'Produit du Tabac',
  'Publicité et services aux entreprises',
  'Assurances et services financiers',
  'Services de construction et de réparation de bâtiments',
  'Télécommunication',
  'Transport et services de stockage',
  'Services de traitement de matériaux',
  'Services d\'éducation et de divertissement',
  'Informatique, scientifique et juridique',
  'Services de restauration',
  'Services médicaux et vétérinaires',
  'Services personnels et sociaux',

]
function Marque() {
  const dispatch = useDispatch()
  const marque = useSelector((state) => state.profile.marque)
  const [logo, setLogo] = useState(null)
  const [photos, setPhotos] = useState([])

  const handleLogoUpload = (e) => {
    let file = e.target.files[0]
    let blob = URL.createObjectURL(file)
    setLogo(blob)
  }

  const handlePhotosUpload = (e) => {
    let files = e.target.files;
    let photos = []
    for (let i = 0; i < files.length; i++) {
      photos.push(URL.createObjectURL(files[i]))
    }
    setPhotos(photos)
  }

  const handleInputUpdate = (field, e) => {
    let data = { ...marque }
    data[field] = e.target.value
    dispatch(setMarque(data))
  }
  return (
    <>
      <form
        className="container"
        name="form-identite"
        id="form-identite"
      >
        <h3>Mettez en avant votre image marque</h3>
        <p>Démarquez-vous grâce aux projets que vous avez réalisés</p>
        <div className="form-identite-info d-block">
          <div className="d-flex">
            {/*Information legal */}
            <section>
              <p className="section-title">Référence</p>
              <div className="form-boxes">
                <label htmlFor="titre">
                  Titre
                </label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  defaultValue={marque.titre}
                  onChange={(e) => handleInputUpdate('titre', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="annee">Année</label>
                <input
                  type="text"
                  name="annee"
                  id="annee"
                  defaultValue={marque.annee}
                  onChange={(e) => handleInputUpdate('annee', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="description">Description</label>
                <textarea
  name="description"
  id="description"
  cols="30"
  rows="10"
  defaultValue={marque.description}
  onChange={(e) => handleInputUpdate('description', e)}
  />
              </div>

              <div className="form-boxes">
                <label htmlFor="categorie">Catégorie</label>
                <select
                  name="categorie"
                  id="categorie"
                  defaultValue={marque.categorie}
                  onChange={(e) => handleInputUpdate('categorie', e)}>
                  {
                    categories.map((category) => {
                      return (
                        <option value={category} >{category}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form-boxes">
                <label htmlFor="nom_client">
                  Nom de client
                </label>
                <input
                  type="text"
                  id="nom_client"
                  name="nom_client"
                  defaultValue={marque.nom_client}
                  onChange={(e) => handleInputUpdate('nom_client', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="">Joindre logo de client</label>
                <label htmlFor="logo" className="text-center upload">
                  upload
                  <input type="file" id="logo" name="logo" className="d-none" onChange={(e) => handleLogoUpload(e)} />
                </label>
              </div>
              <div className="form-boxes">
                <label htmlFor="">Joindre photos des réalisations</label>
                <label htmlFor="photos" className="text-center upload">
                  upload
                  <input type="file" id="photos" name="photos" className="d-none" multiple onChange={(e) => handlePhotosUpload(e)} />
                </label>
              </div>
            </section>

            <p className="line"></p>
            <section>
              <div className="row">
                <div className="col-6">
                  <h4 className="text-secondary">{marque.titre} | {marque.annee}</h4>
                  <p className="text-black-50 h6 mt-4">{marque.description}</p>
                  <p className="text-secondary h6 mt-4">{marque.categorie}</p>
                  <p className="d-flex gap-2 mt-5">
                    {
                      logo ? <img src={logo} width={80} alt="logo" />
                        : ''
                    }
                    <span className="text-secondary">{marque.nom_client}</span>
                  </p>
                </div>
                <div className="col-6">
                  <div className="row">
                    {
                      photos.length ?
                        photos.map((photo) => {
                          return (
                            <div className="col-6">
                              <img src={photo} width={100} alt="" />
                            </div>
                          )
                        }) : ''
                    }
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn pointer btn-outline-secondary rounded-pill px-4" onClick={() => dispatch(setFormStage(1))}>
              Précédent
            </button>
            <button type="button" className="btn pointer btn-outline-success rounded-pill px-4 ms-4">
              Enregistrer et ajouter
            </button>
            <button type="button" className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5" onClick={() => dispatch(setFormStage(3))}>
              Suivant
            </button>
          </div>
        </div>

      </form>
    </>
  )
}

export default Marque;