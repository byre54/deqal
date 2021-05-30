import {
  PrivateKey,
  KeyInfo,
  Identity,
  Client,
  Buckets,
  PushPathResult
} from '@textile/hub'

export interface PhotoSample {
  cid: string;
  name: string;
  path: string;
  width: number;
  height: number;
}
export interface GalleryIndex {
  author: string;
  date: number;
  paths: string[];
}
export interface Photo {
  date: number;
  name: string;
  original: PhotoSample;
  preview: PhotoSample;
  thumb: PhotoSample;
}

const KEYINFO: KeyInfo = {
  key: 'btug3hmo2ojhhs2c5qh4olt7hoy',
}
const IPFSGATEWAY : string = 'https://hub.textile.io'

const getIdentity = async (): Promise<PrivateKey> => {
  /** Restore any cached user identity first */
  const cached = localStorage.getItem("user-private-identity")
  if (cached !== null) {
    /** Convert the cached identity string to a PrivateKey and return */
    return PrivateKey.fromString(cached)
  }
  /** No cached identity existed, so create a new one */
  const identity = await PrivateKey.fromRandom()
  /** Add the string copy to the cache */
  localStorage.setItem("user-private-identity", identity.toString())
  /** Return the random identity */
  return identity
}
const authorize = async(key: KeyInfo, identity: Identity) =>  {
  const client = await Client.withKeyInfo(key)
  await client.getToken(identity)
  return client
}

const setupBuckets = async (key: KeyInfo, identity: Identity) => {
  // Use the insecure key to set up the buckets client
  const buckets = await Buckets.withKeyInfo(key)
  // Authorize the user and your insecure keys with getToken
  await buckets.getToken(identity) 

  const result = await buckets.open('io.textile.dropzone')
  if (!result.root) {
    throw new Error('Failed to open bucket')
  }
  return {
      buckets: buckets, 
      bucketKey: result.root.key,
  }
}

const storeIndex = async (paths:Array<string>,buckets: Buckets, bucketKey: string, identity: Identity) => {
  // Create a json model for the index
  console.log(paths)
  const index = {
    author: identity.public.toString(),
    date: (new Date()).getTime(),
    paths: paths,
  }
  console.log({index})
  // Store the index in the Bucket (or in the Thread later)
  const buf = Buffer.from(JSON.stringify(index, null, 2))
  const path = `index.json`
  await buckets.pushPath(bucketKey, path, buf)
  return index
}

const insertFile = (buckets: Buckets, bucketKey: string, file: File, path: string): Promise<PushPathResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = () => reject('file reading was aborted')
    reader.onerror = () => reject('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      // Finally, push the full file to the bucket
      buckets.pushPath(bucketKey, path, binaryStr).then((raw) => {
        resolve(raw)
      })
    }
    reader.readAsArrayBuffer(file)
  })
}
const getPhotoIndex = async (buckets: Buckets, bucketKey: string,identity:Identity) => {
  if (!buckets || !bucketKey) {
    console.error('No bucket client or root key')
    return
  }
  try {
    const metadata = buckets.pullPath(bucketKey, 'index.json')
    const { value } = await metadata.next();
    let str = "";
    for (var i = 0; i < value.length; i++) {
      str += String.fromCharCode(parseInt(value[i]));
    }
    
    const index: GalleryIndex = JSON.parse(str)
    return index
  } catch (error) {
    // const index = await storeIndex(buckets,bucketKey,identity)
    // return index
    console.log(error)
  }
}
const galleryFromIndex = async (index: GalleryIndex,buckets: Buckets, bucketKey: string,ipfsGateway:string) => {
  if (!buckets || !bucketKey) {
    console.error('No bucket client or root key')
    return
  }
  const photos = []
  for (let path of index.paths) {
    const metadata = await buckets.pullPath(bucketKey, path)
    // console.log(await buckets.links(bucketKey))
    const { value } = await metadata.next();
    console.log({value})
    let str = "";
    let mime = ''
    const b0 = value[0];
    const b1 = value[1];
    const b2 = value[2];
    const b3 = value[3];
    if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4E && b3 == 0x47)
        mime = 'image/png';
    else if (b0 == 0xff && b1 == 0xd8)
        mime = 'image/jpeg';
    else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46)
        mime = 'image/gif';
    else
        return null;
    for (var i = 0; i < value.length; i++) {
      str += String.fromCharCode(parseInt(value[i]));
    }
    const base64 = window.btoa(str)
    const image = new Image()
    image.src = 'data:'+mime+';base64,'+base64
    // const photo = index.paths.length > 1 ? json.preview : json.original
    
    photos.push({
      image :image,
      onload:image.onload,
      // src:`${ipfsGateway}/ipfs/${photo.cid}`,
      width: image.width,
      height: image.height,
      key: path,
    })
  }

  return photos
}

export {
  KEYINFO,
  IPFSGATEWAY,
  getIdentity,
  authorize,
  setupBuckets,
  storeIndex,
  insertFile,
  getPhotoIndex,
  galleryFromIndex,
}