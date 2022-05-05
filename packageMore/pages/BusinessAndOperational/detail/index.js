// packageMore/pages/BusinessAndOperational/detail/index.js
import {
  businiessOpentionalDetail
} from '../../../../api/modules/more';
const languageUtil = require('../../../../utils/languageUtils')
const dayjs = require('dayjs')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    businessDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: languageUtil.languageVersion().lang.page.homeInfo.valueAddedService
    })
    this.setData({
      id: options.id
    })
    this.getBusiniessOpentionalDetail()
  },

  getBusiniessOpentionalDetail() {
    businiessOpentionalDetail({
      id: this.data.id
    }).then(res => {
      res.data.formatDate = dayjs(res.data.publishDate).format('YYYY-MM-DD')
      if (res.data.filepath) {
        res.data.fileName = res.data.filepath.split('/')[res.data.filepath.split('/').length - 1]
        res.data.fileType = res.data.filepath.split('.')[res.data.filepath.split('.').length - 1]
      }
      this.setData({
        businessDetail: res.data
      })
    })
  },

  // 预览
  preview() {
    if (this.data.businessDetail.fileType === 'png' || this.data.businessDetail.fileType === 'jpg' || this.data.businessDetail.fileType === 'jpeg' || this.data.businessDetail.fileType === 'gif') {
      wx.previewImage({
        urls: [this.data.businessDetail.filepath],
        current: 0
      })
    } else {
      wx.downloadFile({
        url: this.data.businessDetail.filepath,
        success(filePath) {
          wx.openDocument({
            filePath: filePath.tempFilePath,
            showMenu: true
          })
        }
      })
    }
  },

  // 下载
  download() {
    if (this.data.businessDetail.fileType === 'png' || this.data.businessDetail.fileType === 'jpg' || this.data.businessDetail.fileType === 'jpeg' || this.data.businessDetail.fileType === 'gif') {
      wx.getImageInfo({
        src: this.data.businessDetail.filepath, //这里放你要下载图片的数组(多张) 或 字符串(一张) 下面代码不用改动
        success: function (ret) {
          var path = ret.path;
          wx.saveImageToPhotosAlbum({
            filePath: path,
            success() {
              wx.hideLoading();
              wx.showToast({
                title: '下载图片成功',
                duration: 2000,
                mask: true,
              });
            }
          });
        }
      });
    } else {
      wx.setClipboardData({
        data: this.data.businessDetail.filepath,
        success() {
          wx.showToast({
            title: '已复制下载路径，请前往外部浏览器打开并下载',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
  }
})