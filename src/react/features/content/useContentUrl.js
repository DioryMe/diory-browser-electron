import { useEffect } from 'react'
import { useDispatchActions } from '../../store'
import { useDiograph } from '../diograph/useDiograph'

import { setContentUrl } from './contentActions'

export const useContentUrl = () => {
  const { story } = useDiograph()
  const { data = [] } = story
  const { contentUrl, encodingFormat } = (data && data[0]) || {}
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (contentUrl) {
      getContentUrlFromCID(contentUrl, encodingFormat)
        .then((url) => {
          dispatch(setContentUrl(url))
        })
        .catch((error) => {
          console.error('useContentUrl error:', contentUrl, encodingFormat, error)
        })
    }
  }, [dispatch, contentUrl, encodingFormat])
}

const getContentUrlFromCID = async (cid, encodingFormat) => {
  if (window.featureIsEnabled('DCLI_ADAPTER')) {
    const loadedRoom = await window.dcliAdapter.getLoadedRoom()
    const content = await loadedRoom.readContent(cid)
    const url = URL.createObjectURL(new Blob([content], { type: encodingFormat }))
    console.log('Created URL: ', url)
    return url
  }

  const contentUrls = {
    'pixnio-public-domain-test-content.txt':
      'diory-demo-content//Scouts BSA International/pixnio-public-domain-test-content.txt',
    bafkreidqzn2oioyvd62dc4cxvtbuwxcq6p7v5b3ro2i5yoofpa4ouppimy:
      'diory-demo-content//Scouts BSA International/PIXNIO-54454-6138x4092.jpeg',
    bafkreicuh7r63n4peyr6bluc3ebenq4lw4jh463d3mpdilnwaysn3us324:
      'diory-demo-content//Scouts BSA International/PIXNIO-53555-1782x1188.jpeg',
    bafkreif26at22ofail3cfun2hywmfzumzdml3ts53553ezsbcdsn2jnoem:
      'diory-demo-content//Scouts BSA International/PIXNIO-53553-1782x1188.jpeg',
    bafkreif4lt3vhlmxpcey4xooxlsoebpwfdwtflfwfru7d2meai2fb236eu:
      'diory-demo-content//Scouts BSA International/PIXNIO-53551-1782x1188.jpeg',
    bafkreic6ttvffo4di4jzsjveroqedyxirisudqfj6w6gcnuoaiikekxxje:
      'diory-demo-content//Scouts BSA International/PIXNIO-53549-1782x1188.jpeg',
    bafkreifgddwk2ymrc7neoniqdcolrgmvrfqfiknvbagusvxoa5hfca7cle:
      'diory-demo-content//Scouts BSA International/PIXNIO-53543-1782x1188.jpeg',
    bafkreie53fgzjsq4zobl6vcldgvll6orkoxzu5khyimrzda43mwt3y3qhm:
      'diory-demo-content//Scouts BSA International/PIXNIO-53541-1782x1188.jpeg',
    bafkreifhhmoftoo26lc223k5riwflm6uvgrizwakg5z7n7yruj7gty27ji:
      'diory-demo-content/Generic content/some-video.mov',
    bafkreihkqxpj4iwdw32vshr47qjme3fm3alwnar6ltngwscypf4jtpff6q:
      'diory-demo-content/Generic content/some-image.jpeg',
    'some-document.pdf': 'diory-demo-content/Generic content/some-document.pdf',
    'some-document.odt': 'diory-demo-content/Generic content/some-document.odt',
    'some-audio.m4a': 'diory-demo-content/Generic content/some-audio.m4a',
    bafkreihrnemuclicob3r3u6h2nqwjqfipryecd4lusoi4ecsb7cnpcnjgq:
      'diory-demo-content/Jane/PIXNIO-12700-2816x2112.jpeg',
    bafkreihvrvdnsthz2izl4beiuo6m3hceziss7khdxamzzqoz4p6pvzuham:
      'diory-demo-content/Jane/PIXNIO-12662-2816x2112.jpeg',
    bafkreie2zrz5q2go7ip4oy66j22fe3pgcqjbtlswag7bxurts3sgsklyo4:
      'diory-demo-content/Jane/PIXNIO-12656-2816x2112.jpeg',
    bafkreigpx2jl6dc3cnfiyttftplirxes7x73wxos7oaznatn6dcoqtzrny:
      'diory-demo-content//Potomac Kayaking Center/PIXNIO-54348-6177x4118.jpeg',
    bafkreihbdmt4bhosash53o535633m22xnz6ydhc47ein47oom4lj7kznlq:
      'diory-demo-content//Riverfest 2014/PIXNIO-53350-6177x4118.jpeg',
    bafkreihp3h6ggnxysuobjsgtsibaqq5khzjbaamyy6ec2adredtf2ixz3u:
      'diory-demo-content//Mary/PIXNIO-53799-6177x4118.jpeg',
    bafkreih2imdq3mpqshbzc4wipwdvuvm5zxqllpm5wahlnprmnxeqdgcdvu:
      'diory-demo-content//Mary/PIXNIO-53747-4118x3088.jpeg',
    bafkreicupadfckb4myc2yom5etx2co7eph5sg2lshcx7eameeijt6hlhza:
      'diory-demo-content//Adamstown Middle School/PIXNIO-54360-6177x4118.jpeg',
    bafkreihtiytevmyeiwqt7v4fj6ocb3nqioyjoh2nqzid7vrkshkndj5hdu:
      'diory-demo-content//Adamstown Middle School/PIXNIO-54298-5970x3980.jpeg',
  }

  // TODO: Is encodingFormat needed?
  if (Object.keys(contentUrls).includes(cid)) {
    return contentUrls[cid]
  }

  return cid
}

// FIXME: revokeContentUrl is not currently triggered anywhere
// - should be done after loading the content
// eslint-disable-next-line no-unused-vars
const revokeContentUrl = (url) => {
  if (window.featureIsEnabled('DCLI_ADAPTER')) {
    window.dcliAdapter.revokeContentUrl(url)
    console.log('Revoked URL: ', url)
    return
  }
  throw new Error('Not implemented')
}
