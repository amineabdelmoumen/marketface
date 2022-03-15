import React, {useState} from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch, useSelector} from "react-redux";
import {setArticle, setArticles} from "../../store/profileSlice";
import {deleteArticle, saveArticles, saveImages} from "../../lib/crud";

let uploadForm = new FormData()
function Article(props) {
  const dispatch = useDispatch()
  const article = useSelector((state) => state.profile.article)
  const articles = useSelector((state) => state.profile.articles)
  const [photos, setPhotos] = useState([])
  const [index, setIndex] = useState(-1)

  function handlePhotosUpload(e) {
    const token = localStorage.getItem('token')
    let data = {...article}
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      uploadForm.append(`images[${i}]`, files[i])
    }
    saveImages(uploadForm, token)
      .then((res) => {
        const response = res.data
        uploadForm = new FormData()
        data['images'] = response.paths;
        dispatch(setArticle(data))
      })
    setPhotos(photos)
  }

  const handleInputUpdate = (field, e) => {
    let data = {...article}
    data[field] = e.target.value
    dispatch(setArticle(data))
  }

  const appendArticle = () => {
    let data = [...articles]
    if(index > -1) {
      data[index] = article
    }else {
      data.push(article)
    }
    setIndex(-1)
    dispatch(setArticles(data))
    dispatch(setArticle({
      type_article: "Produit"
    }))
  }
  const save = () => {
    const token = localStorage.getItem('token')
    if(!articles.length || index > -1 || Object.keys(article).length > 1) {
      appendArticle()
    }
    saveArticles(articles, token)
      .then((res) => res.data)
      .then((data) => {
        dispatch(setArticles(data))
        dispatch(setFormStage(5))
      })
  }
  const setArticleData = (i) => {
    const data = {...articles[i]}
    setIndex(i)
    dispatch(setArticle(data))
  }

  const removeArticle = async (i) => {
    const token = localStorage.getItem('token')
    setIndex(-1)
    let elements = [...articles]
    if(elements[i] && elements[i].id) {
      await deleteArticle(elements[i].id, token)
    }
    elements.splice(i, 1)
    dispatch(setArticles(elements))
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
        {
          articles.length ?
            articles.map((el, i) => {
              return (
                <span className="badge bg-primary cursor-pointer">
                  <span onClick={() => setArticleData(i)}>{el.nom}</span>
                  <i className="fas fa-close ms-3" onClick={() => removeArticle(i)}></i>
                </span>
              )
            })
            : ''
        }
        <h5 className="text-center text-secondary">Ajouter un article</h5>
        <div className="form-identite-info d-block">
          <div className="d-flex">
            {/*Information legal */}
            <section>
              <div className="form-boxes">
                <label htmlFor="titre">
                  Il s'agit d'un
                </label>
                <select name="article_type" value={article.type_article} onChange={(e) => handleInputUpdate('type_article', e)}>
                  <option value="produit">Produit</option>
                  <option value="service">Service</option>
                  <option value="immobilier">Immobilier</option>
                </select>
              </div>
              <div className="form-boxes">
                <label htmlFor="nom">Nom d'article</label>
                <input type="text" name="nom" id="nom" value={article.nom} onChange={(e) => handleInputUpdate('nom', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="10" value={article.description}
  onChange={(e) => handleInputUpdate('description', e)}/>
              </div>

              <div className="form-boxes">
                <label htmlFor="category">Prix</label>
                <input type="text" value={article.prix} onChange={(e) => handleInputUpdate('prix', e)}/>
              </div>
              {/*<p className="form-boxes">*/}
              {/*  <label htmlFor="nom_client">*/}
              {/*    Catégorie:*/}
              {/*  </label>*/}
              {/*  <input type="text" id="nom_client" onChange={(e) => setCategorie(e.target.value)} />*/}
              {/*</p>*/}
              <div className="form-boxes">
                <label htmlFor="quantite">
                  Quantité:
                </label>
                <input type="text" id="quantite" value={article.quantite} onChange={(e) => handleInputUpdate('quantite', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="type">
                  Type:
                </label>
                <input type="text" id="type" value={article.type} onChange={(e) => handleInputUpdate('type', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="photos">
                  Joindre des photos d'article
                </label>
                <input type="file" id="photos" name="photos[]" multiple onChange={(e) => handlePhotosUpload(e)} />
              </div>
            </section>

            <p className="line"></p>
            <section>
              <div className="row">
                <div className="col-6">
                  <h4 className="text-secondary">{article.nom}</h4>
                  {/*<p>Categorie: {categorie}</p>*/}
                  <p>Quantite: {article.quantite}</p>
                  <p>{article.type}</p>
                  <p>{article.prix}dh/{article.quantite}</p>
                  <p>{article.description}</p>
                </div>
                <div className="col-6">
                  <div className="row">
                    {
                      article.images && article.images.length ?
                        article.images.map((photo) => {
                          return (
                            <div className="col-6">
                              <img src={`${process.env.REACT_APP_HOST_URL}/${photo.path}`} width={100} alt="" />
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
            <button type="button" className="btn pointer btn-outline-secondary rounded-pill px-4" onClick={() => dispatch(setFormStage(3))}>
              Précédent
            </button>
            <button type="button" className="btn pointer btn-outline-success rounded-pill px-4 ms-4" onClick={() => appendArticle()}>
              Enregistrer et ajouter
            </button>
            <button type="button" className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5" onClick={() => save()}>
              Suivant
            </button>
          </div>
        </div>

      </form>
    </>
  );
}

export default Article;