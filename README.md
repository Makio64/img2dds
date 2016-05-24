[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# img2dds

![Super Duplicate Screenshot](http://makiopolis.com/img2dds.jpg)

Convert your images into dds texture files and test it into a threejs view directly.

## Install

```bash
# Install dependencies
npm install
# Start the app
npm start
```

## Use it

Drag'n drop your image(s) into the app and it will convert it to the dds (the file is generated into the same folder but the extention change to .dds, you can change the folder path)

## Technical note

The images ~~dimensions need to a power of two : 256x256 / 512x512 / 256x512 / etc..~~ will be resized to the next power of 2 before convert as DDS texture.

The compression of the dds is terrible but on my test I figured out the gzipped version are very close, here my results on 59images with a size from 256 to 2048 (no alpha) :
- jpegs files optimized (imageoptim) : 12.9mo
- jpegs files optimized (imageoptim) gzipped : 12.2mo
- dds files dxt1 : 48mo
- dds files dxt1 gzipped : 12.3mo
- dds files dxt5 : 89.7mo
- dds files dxt5 gzipped : 14.9mo

The app is build with nodejs / electron / threejs / datgui

The dds header is build into the app but the dxt compression use node-dxt(squish algorithm) https://github.com/Morhaus/node-dxt

The dds files are load with the THREE.DDSLoader: https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/DDSLoader.js

## Compression dxt options:
- low : super fast poor quality
- normal : fast & good quality
- hight : super slow & best quality

- DXT1 : this format don't manage the transparency
- DXT3 : transparent and 16bits
- DXT5 : transparent and 16bits (recommended for transparent texture)

- ColorMetric : perceptual(default) / uniform
- weightColourByAlpha : true / false (default is false)

## Learn more about DDS & DXT Compressed Texture

Great article on DDS & DXT : http://beyondskyrim.org/2015/05/26/working-with-dds-files/

Microsoft docs : https://msdn.microsoft.com/en-us/library/windows/desktop/bb943991(v=vs.85).aspx
