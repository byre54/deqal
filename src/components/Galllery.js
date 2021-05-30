import React from 'react'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
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
import { UserAuth } from '@textile/hub'


const styles = {
  
}

class Gallery extends React.Component{
  constructor(props){
    super()
    this.state = {
      open : false,
    }
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
            <InputFiles onChange={files => {
              // console.log(files[0])
              if(files[0].type.indexOf('image')!==-1){
                console.log(files[0])
              }
            }}>
              <Button>Upload</Button>
            </InputFiles>
            <ImageGallery items={images} />
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