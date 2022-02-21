import React, {useState} from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch} from "react-redux";

function Article(props) {
  const dispatch = useDispatch()
  const [article, setArticle] = useState('')
  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [prix, setPrix] = useState('')
  const [categorie, setCategorie] = useState('')
  const [quantite, setQuantite] = useState('')
  const [type, setType] = useState('')
  const [photos, setPhotos] = useState([])

  function handlePhotosUpload(e) {
    let files = e.target.files;
    let photos = []
    for (let i = 0; i < files.length; i++) {
      photos.push(URL.createObjectURL(files[i]))
    }
    setPhotos(photos)
  }
  return (
    <>
      <form
        className="container"
        name="form-identite"
        id="form-identite"
      >
        <div className="page_number">2/2</div>
        <h4 className="ms-5 text-primary">Créez votre E-catalogue</h4>
        <h5 className="text-center text-secondary">Ajouter un article</h5>
        <div className="form-identite-info d-block">
          <div className="d-flex">
            {/*Information legal */}
            <section>
              <p className="form-boxes">
                <label htmlFor="titre">
                  Il s'agit d'un
                </label>
                <select name="article_type" onChange={(e) => setArticle(e.target.value)}>
                  <option value="produit">Produit</option>
                  <option value="service">Service</option>
                  <option value="immobilier">Immobilier</option>
                </select>
              </p>
              <p className="form-boxes">
                <label htmlFor="annee">Nom d'article</label>
                <input type="text" name="annee" id="annee" onChange={(e) => setNom(e.target.value)} />
              </p>
              <p className="form-boxes">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="10"
                  onChange={(e) => setDescription(e.target.value)}></textarea>
              </p>

              <p className="form-boxes">
                <label htmlFor="category">Prix</label>
                <input type="text" onChange={(e) => setPrix(e.target.value)}/>
              </p>
              <p className="form-boxes">
                <label htmlFor="nom_client">
                  Catégorie:
                </label>
                <input type="text" id="nom_client" onChange={(e) => setCategorie(e.target.value)} />
              </p>
              <p className="form-boxes">
                <label htmlFor="nom_client">
                  Quantité:
                </label>
                <input type="text" id="nom_client" onChange={(e) => setQuantite(e.target.value)} />
              </p>
              <p className="form-boxes">
                <label htmlFor="nom_client">
                  Type:
                </label>
                <input type="text" id="nom_client" onChange={(e) => setType(e.target.value)} />
              </p>
              <p className="form-boxes">
                <label htmlFor="photos">
                  Joindre des photos d'article
                </label>
                <input type="file" id="photos" name="photos[]" multiple onChange={(e) => handlePhotosUpload(e)} />
              </p>
            </section>

            <p className="line"></p>
            <section>
              <div className="row">
                <div className="col-6">
                  <h4 className="text-secondary">{nom}</h4>
                  <p>Categorie: {categorie}</p>
                  <p>Quantite: {quantite}</p>
                  <p>{type}</p>
                  <p>{prix}dh/{quantite}</p>
                  <p>{description}</p>
                </div>
                <div className="col-6">
                  <div className="row">
                    {
                      photos.length ?
                        photos.map((photo) => {
                          return (
                            <div className="col-6">
                              <img src={photo} width={100} />
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
            <button type="button" className="btn pointer btn-outline-secondary rounded-pill px-4" onClick={() => dispatch(setFormStage(4))}>
              Précédent
            </button>
            <button type="button" className="btn pointer btn-outline-success rounded-pill px-4 ms-4">
              Enregistrer et ajouter
            </button>
            <button type="button" className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5" onClick={() => dispatch(setFormStage(5))}>
              Suivant
            </button>
          </div>
        </div>

      </form>
    </>
  );
}

export default Article;