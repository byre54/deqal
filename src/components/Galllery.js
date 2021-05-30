import React from 'react'
// nodejs library that concatenates classes
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import InputFiles from 'react-input-files'

import {
  Grid,
  Image,
  Button,
  Modal
} from 'semantic-ui-react'

import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import {
  KEYINFO,
  IPFSGATEWAY,
  getIdentity,
  authorize,
  setupBuckets,
  storeIndex,
  insertFile,
  getPhotoIndex,
  galleryFromIndex,
} from '../libs/hub'

const styles = {
  
}

class Gallery extends React.Component{
  constructor(props){
    super()
    this.state = {
      open : false,
      bucks:null,
      identity:null,
      links:[],
      photos:[],
      images:[],
      paths:[],
      isLoaded : false,
    }
  }
  componentDidMount(){
    this.initHub()
  }
  initHub = async()=>{
    const identity = await getIdentity()
    // console.log(identity)
    const auth = await authorize(KEYINFO,identity)
    // console.log(auth)
    this.initBuckets({identity})
  }
  initBuckets = async({identity})=>{
    const bucks = await setupBuckets(KEYINFO,identity)
    if(bucks){
      this.setState({bucks,identity})
      console.log({bucks,identity})
      // const storedIndex= await storeIndex(['wp8336269.jpg','gfriend-korean-girl-group-model-korean-girls-girls-2132.jpg'],bucks.buckets,bucks.bucketKey,identity)
      // console.log({storedIndex})
      this.initBucketLinks({bucks,identity})
      this.initGallery({bucks,identity})
    }
  }
  initBucketLinks = async({bucks,identity}) =>{
    const links = await bucks.buckets.links(bucks.bucketKey)
    this.setState({links})
    console.log({links})
    
  }
  initGallery = async({bucks,identity}) =>{
    const galleryIndex = await getPhotoIndex(bucks.buckets,bucks.bucketKey,identity)
    this.setState({paths:galleryIndex.paths})
    // const photos = await galleryFromIndex(galleryIndex,bucks.buckets,bucks.bucketKey,IPFSGATEWAY,(e)=>{
    //   this.setState({images:[
    //     ...this.state.images,
    //     e.path[0].currentSrc
    //   ]})
    //   console.log({e})
    // })
    // setInterval(()=>{
      
    // },5000)
    // this.setState({photos})
    // photos.map(item=>{
    //   item.onload = ()=>{
    //     console.log({item})
    //     this.setState({photos:[
    //       ...this.state.photos,
    //       item
    //     ]})
    // }})
  }
  
  render(){
    return (
      <div>
        <Button onClick={()=>this.setState({open:true})}>
          <Grid columns='3'>
            {
              images.map(item=>(
                <Grid.Column><Image src={item.thumbnail} /></Grid.Column>
              ))
            }
          </Grid>
        </Button>
        <Modal
          style={{marginLeft:30}}
          size='fullscreen'
          open={this.state.open}
          onClose={() => this.setState({open:false})}
        >
          <Modal.Header>Gallery</Modal.Header>
          <Modal.Content>
            {this.state.bucks &&
            <InputFiles onChange={async(files) => {
              // console.log(files[0])
              if(files[0].type.indexOf('image')!==-1){
                const file = files[0]
                const path = file.name 
                const storedIndex = await storeIndex([file.name],this.state.bucks.buckets,this.state.bucks.bucketKey,this.state.identity)
                console.log({storedIndex})
                const inserted = await insertFile(this.state.bucks.buckets,this.state.bucks.bucketKey,file,path)
                console.log({inserted})
              }
            }}>
              <Button>Upload</Button>
            </InputFiles>}
            {this.state.paths.length>0 ? 
            <ImageGallery items={this.state.paths.map(item=>({
              original:`${this.state.links.url}/${item}`,
              thumbnail:`${this.state.links.url}/${item}`
            }))} />:<CircularProgress />}
          </Modal.Content>
          <Modal.Actions>
            <Button color='blue' onClick={() => this.setState({open:false})}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
const images = [
  {
    original: 'http://lorempixel.com/1000/600/nature/1/',
    thumbnail: 'http://lorempixel.com/250/150/nature/1/',
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/2/',
    thumbnail: 'http://lorempixel.com/250/150/nature/2/'
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/3/',
    thumbnail: 'http://lorempixel.com/250/150/nature/3/'
  }
]
Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Gallery);