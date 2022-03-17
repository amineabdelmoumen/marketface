import React, {useEffect, useState} from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch, useSelector} from "react-redux";
import {setMarque, setReferences,} from "../../store/profileSlice";
import categories from "../../lib/constants/categories";
import {deleteReference, saveImages, saveReferences} from "../../lib/crud";
import {useSnackbar} from 'react-simple-snackbar'
import snackbarStyles from "../../lib/snackbarStyles";

let uploadForm = new FormData()
function Marque() {
  const [openSnackbar, closeSnackbar] = useSnackbar(snackbarStyles)
  const dispatch = useDispatch()
  const marque = useSelector((state) => state.profile.marque)
  const references = useSelector((state) => state.profile.references)
  const [index, setIndex] = useState(-1)
  const [sendReferences, setSendReferences] = useState(false)

  useEffect(() => {
    if(sendReferences) {
      if(references.length) {
        const token = localStorage.getItem('token')
        saveReferences({references: references}, token)
          .then(res => res.data)
          .then(data => {
            dispatch(setReferences(data))
            setSendReferences(false)
            dispatch(setFormStage(3))
          }).catch((err) => {
            let data = err.response.data
            openSnackbar(<ul>
              {
                Object.values(data.errors).map((errors) => errors.map((error) => <li>{error}</li>))
              }
            </ul>)
          })
      }else {
        setSendReferences(false)
        dispatch(setFormStage(3))
      }
    }
  }, [sendReferences])
  const handleLogoUpload = (e) => {
    const token = localStorage.getItem('token')
    let file = e.target.files[0]
    let data = {...marque}
    uploadForm.set('logo', file)
    saveImages(uploadForm, token)
      .then((res) => {
        const response = res.data
        uploadForm = new FormData()
        data['logo'] = response.path;
        dispatch(setMarque(data))
      })
  }

  const handlePhotosUpload = (e) => {
    const token = localStorage.getItem('token')
    let files = e.target.files;
    let data = {...marque}
    for (let i = 0; i < files.length; i++) {
      uploadForm.append(`images[${i}]`, files[i])
    }
    saveImages(uploadForm, token)
      .then((res) => {
        const response = res.data
        uploadForm = new FormData()
        data['images'] = response.paths;
        dispatch(setMarque(data))
      })
  }

  const changeReference = (i) => {
    setIndex(i)
    const ref = {...references[i]}
    dispatch(setMarque(ref))
  }

  const removeReference = async (i) => {
    const token = localStorage.getItem('token')
    setIndex(-1)
    let elements = [...references]
    if(elements[i] && elements[i].id) {
      await deleteReference(elements[i].id, token)
    }
    elements.splice(i, 1)
    dispatch(setReferences(elements))
  }

  const handleInputUpdate = (field, e) => {
    let data = { ...marque }
    data[field] = e.target.value
    dispatch(setMarque(data))
  }
  const save = () => {
    let data = [...references]
    if(index > -1) {
      data[index] = marque;
    }else {
      data.push(marque)
    }
    setIndex(-1)
    dispatch(setReferences(data))
    dispatch(setMarque({
      titre: '',
      annee: '',
      description: '',
      categorie: 'Produits chimiques',
      nom_client: '',
      images: [],
      logo: null
    }))
  }
  const handleSave = () => {
    if(!references.length || index > -1 || Object.values(marque).find(el => el === '' || el === null || el === []) === undefined) {
      save()
    }
    setSendReferences(true)
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
        {
          references.length ?
            references.map((el, i) => {
              return (
                <span className="badge bg-primary cursor-pointer">
                  <span onClick={() => changeReference(i)}>{el.titre}</span>
                  <i className="fas fa-close ms-3" onClick={() => removeReference(i)}></i>
                </span>
              )
            })
            : ''
        }
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
                  value={marque.titre}
                  onChange={(e) => handleInputUpdate('titre', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="annee">Année</label>
                <input
                  type="text"
                  name="annee"
                  id="annee"
                  value={marque.annee}
                  onChange={(e) => handleInputUpdate('annee', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="description">Description</label>
                <textarea
  name="description"
  id="description"
  cols="30"
  rows="10"
  value={marque.description}
  onChange={(e) => handleInputUpdate('description', e)}
  />
              </div>

              <div className="form-boxes">
                <label htmlFor="categorie">Catégorie</label>
                <select
                  name="categorie"
                  id="categorie"
                  value={marque.categorie}
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
                  value={marque.nom_client}
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
                      marque.logo ? <img src={`${process.env.REACT_APP_HOST_URL}/${marque.logo}`} width={80} alt="logo" />
                        : ''
                    }
                    <span className="text-secondary">{marque.nom_client}</span>
                  </p>
                </div>
                <div className="col-6">
                  <div className="row">
                    {
                      marque.images && marque.images.length ?
                        marque.images.map((photo) => {
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
            <button type="button" className="btn pointer btn-outline-secondary rounded-pill px-4" onClick={() => dispatch(setFormStage(1))}>
              Précédent
            </button>
            <button type="button" className="btn pointer btn-outline-success rounded-pill px-4 ms-4" onClick={() => save()}>
              Enregistrer et ajouter
            </button>
            <button type="button" className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5" onClick={() => handleSave()}>
              Suivant
            </button>
          </div>
        </div>

      </form>
    </>
  )
}

export default Marque;