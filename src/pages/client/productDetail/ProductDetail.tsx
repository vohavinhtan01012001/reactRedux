import {
  faCartShopping,
  faCheck,
  faChevronRight,
  faHandHoldingUsd,
  faHeart,
  faPhoneVolume,
  faSync,
  faTruckMoving
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addFavouriteProduct, showDetailProduct, showFavouriteProduct } from 'api/client/productClient.api'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RootState, useAppDispatch } from 'store'
import CurrencyFormatter from '../../../component/currencyFormatter/CurrencyFormatter'
import { addToCart, showImageBig } from 'slice/client/productClient.slice'
import RadioCheck from 'component/checkbox/RadioCheck'
import { getSizeList } from 'api/admin/size.api'
import { RadioChangeEvent } from 'antd'
import img1 from '../../../assets/frontend/img/detail/img1.png'
import { faHeart as heartIcon } from '@fortawesome/free-regular-svg-icons'

export default function ProductDetail() {
  const product = useSelector((state: RootState) => state.productClient.product)
  const category = useSelector((state: RootState) => state.productClient.category)
  const imageBig = useSelector((state: RootState) => state.productClient.imageBig)
  const productList = useSelector((state: RootState) => state.productClient.productList)
  const heart = useSelector((state: RootState) => state.productClient.heart)
  const dispatch = useAppDispatch()
  const { id, slug } = useParams()

  useEffect(() => {
    const productId = Number(id)
    const nameCategory = String(slug)
    const promise = dispatch(showDetailProduct({ nameCategory, productId }))

    return () => {
      promise.abort()
    }
  }, [dispatch, id, slug])

  useEffect(() => {
    if (product?.productGroupId) {
      const promise = dispatch(showFavouriteProduct({ productGroupId: product?.productGroupId }))
      return () => {
        promise.abort()
      }
    }
  }, [product, dispatch, product?.productGroupId])

  const listImg = [product?.image, product?.image2, product?.image3, product?.image4]

  const hanldeImg = (e: any) => {
    const imgBig: string = e.target.src
    dispatch(showImageBig(imgBig))
  }
  const history = useNavigate()
  const handleCheckSize = ({ target: { value } }: RadioChangeEvent) => {
    history(`/${slug}/${value}`)
  }

  const submitAddtocart = () => {
    dispatch(addToCart({ product: product }))
  }

  const submitAddtocartPay = () => {
    dispatch(addToCart({ product: product }))
    history('/cart')
  }
  const handleHeart = () => {
    if (product?.productGroupId) {
      dispatch(addFavouriteProduct({ productGroupId: product?.productGroupId }))
    }
  }

  return (
    <>
      <div className='container'>
        <div className='wide grid'>
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5'>
              <div className='app__container--category'>
                <Link to='/' className='app__container--link'>
                  Trang chủ
                </Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <Link to={`/category/${category?.name}`} className='app__container--link'>
                  {category?.name}
                </Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <p className='app__container--text'>{product?.name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='px-5'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='container__product'>
              <ul className='product__img--list'>
                {listImg.map((image, index) => {
                  return (
                    <li className='product__img--item'>
                      <img src={image} onClick={hanldeImg} className='product__img--image' alt={'image' + index} />
                    </li>
                  )
                })}
              </ul>
              <div className='product__img--big'>
                <img
                  src={imageBig == '' ? product?.image : imageBig}
                  className='product__img--index'
                  alt={product?.name}
                />
              </div>
            </div>
            <div className='information-product' style={{ marginBottom: '10px' }}>
              <div className='product-title px-3 py-2'>
                <h1 className='text-start text-lg font-bold'>{product?.name}</h1>
              </div>
              {/* <div className='content__product-evaluate'>{starIcons}</div> */}
              <div className='product-price px-4 pb-3' id='price-preview'>
               {/*  {product?.promotionId ? (
                  <>
                    <span className='text-start text-base text-red-600'>
                      <h2>{product && CurrencyFormatter(product?.priceReduced)}</h2>
                    </span>
                    <del>
                      <h4>{product && CurrencyFormatter(product?.price)}</h4>
                    </del>
                  </>
                ) : (
                  <h2 className='text-start text-base text-red-600'>
                    {product && CurrencyFormatter(product?.priceReduced)}
                  </h2>
                )} */}
              </div>

              <form
                id='add-item-form'
                action='/cart/add'
                method='post'
                className='variants clearfix variant-style px-4 py-3'
              >
                <div style={{ marginBottom: '20px', display: 'flex' }}>
                  <p className='text-base font-bold'>Số lượng:</p>
                  <p className='ml-1'>{product?.quantity}</p>
                </div>
                <div style={{ marginBottom: '20px', display: 'flex' }}>
                  <p className='text-base font-bold'>Giới tính:</p>
                  <p className='ml-1'>{product?.gender === 0 ? 'Nam' : product?.gender === 1 ? 'Nữ' : 'Nam và nữ'}</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <p className='text-base font-bold'>Kích thước:</p>
                  {product?.sizeId && <RadioCheck size={product?.id} handleCheckSize={handleCheckSize} />}
                </div>
                {/*  <div>
                  <p className='fs-4 text'>Kích thước</p>
                  <ButtonGroup>
                    {filterKichThuoc.map((radio, idx) =>
                      radio.MauSacId == product.MauSacId ? (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type='radio'
                          variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                          name='radio'
                          value={radio.KichThuocId}
                          checked={radioValue === radio.KichThuocId}
                          onChange={(e) => handleKichThuoc(e, radio)}
                          className='fs-4 text'
                          style={{
                            marginLeft: '20px',
                            width: '40px',
                            height: '40px',
                            lineHeight: '30px',
                            borderRadius: '50%',
                            fontWeight: 'bold'
                          }}
                        >
                          {radio.KichThuocproduct?.name}
                        </ToggleButton>
                      ) : (
                        ''
                      )
                    )}
                  </ButtonGroup>
                </div> */}
                <div>
                  <div className='clearfix button__buy' style={{ marginTop: '0', marginBottom: '30px' }}>
                    {product?.quantity === 0 ? (
                      <>
                        <button
                          type='button'
                          disabled
                          onClick={submitAddtocart}
                          className='btn-style-add add-to-cart btn__cart-disabled'
                        >
                          <FontAwesomeIcon className='button__buy--icon' icon={faCartShopping} />
                          <span className='txt'>Thêm vào giỏ</span>
                        </button>
                        <button
                          type='button'
                          disabled
                          onClick={submitAddtocartPay}
                          className='btn-style-add add-to-cart btn__cart-disabled'
                        >
                          <FontAwesomeIcon className='button__buy--icon' icon={faCheck} />
                          <span className='txt'>Mua ngay</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button type='button' onClick={submitAddtocart} className='btn-style-add add-to-cart btn__cart'>
                          <FontAwesomeIcon className='button__buy--icon' icon={faCartShopping} />
                          <span className='txt'>Thêm vào giỏ</span>
                        </button>
                        <button
                          type='button'
                          onClick={submitAddtocartPay}
                          className='btn-style-add add-to-cart btn__cart'
                        >
                          <FontAwesomeIcon className='button__buy--icon' icon={faCheck} />
                          <span className='txt'>Mua ngay</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <button type='button' onClick={handleHeart}>
                  {heart ? (
                    <FontAwesomeIcon icon={faHeart} className='text-3xl text-red-600' />
                  ) : (
                    <FontAwesomeIcon icon={heartIcon} className='text-3xl text-red-600' />
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12 col-xs-12 pd-none-box-service mb15 fs-4 text'>
              <div className='box-service-product'>
                <div className='header-box-service-product text-center'>
                  <div className='title'>TIẾP ĐÓN</div>
                  <div className='content'>Được phục vụ Quý Khách hàng là niềm vinh dự đối với chúng tôi.</div>
                </div>
                <div className='content-box-service-product row'>
                  <div className='col-lg-12 col-sm-3 col-xs-12'>
                    <div className='border-service-product'>
                      <div className='flexbox-grid-default'>
                        <div className='documents__content-icon'>
                          <FontAwesomeIcon icon={faTruckMoving} />
                        </div>
                        <div className='flexbox-content des-service-product'>
                          <div className='title'>GIAO HÀNG TOÀN QUỐC</div>
                          <div className='content'>
                            Thời gian giao hàng linh động từ 3 - 4 - 5 ngày tùy khu vực, đôi khi sẽ nhanh hơn hoặc chậm
                            hơn. Mong Quý Khách hàng thông cảm và cố gắng đợi hàng giúp shop.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-sm-3 col-xs-12'>
                    <div className='border-service-product'>
                      <div className='flexbox-grid-default'>
                        <div className='documents__content-icon'>
                          <FontAwesomeIcon icon={faSync} />
                        </div>
                        <div className='flexbox-content des-service-product'>
                          <div className='title'>CHÍNH SÁCH ĐỔI TRẢ HÀNG</div>
                          <div className='content'>
                            Sản phẩm được phép đổi hàng trong vòng 36h nếu phát sinh lỗi từ nhà sản xuất (Yêu cầu: hình
                            ảnh phần bị lỗi rõ nét, chi tiết và đầy đủ).
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-sm-3 col-xs-12'>
                    <div className='border-service-product'>
                      <div className='flexbox-grid-default'>
                        <div className='documents__content-icon'>
                          <FontAwesomeIcon icon={faHandHoldingUsd} />
                        </div>
                        <div className='flexbox-content des-service-product'>
                          <div className='title'>GIAO HÀNG NHẬN TIỀN VÀ KIỂM KÊ ĐƠN HÀNG</div>
                          <div className='content'>
                            Được phép kiểm hàng trước khi thanh toán. Lưu ý: Trường hợp Quý Khách hàng đã nhận hàng về
                            nhà, vui lòng quay video unbox đơn hàng trong tình trạng nguyên vẹn để có căn cứ xác thực
                            đơn hàng gặp phải vấn đề, trường hợp không có video shop không thể hỗ trợ.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-sm-3 col-xs-12'>
                    <div className='border-service-product'>
                      <div className='flexbox-grid-default'>
                        <div className='documents__content-icon'>
                          <FontAwesomeIcon icon={faPhoneVolume} />
                        </div>
                        <div className='flexbox-content des-service-product'>
                          <div className='title'>ĐẶT HÀNG ONLINE VÀ KIỂM TRA ĐƠN HÀNG VUI LÒNG LIÊN HỆ</div>
                          <div className='content'>037 335 7405</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8 col-xs-12 pd5 fs-4 text'>
              <div className='product__description'>
                <div className='product__comment'>
                  <h2>MÔ TẢ SẢN PHẨM</h2>
                </div>
                <div className='product__comment--description' style={{ padding: '5px' }}>
                  <p className=''>{product?.description}</p>
                  <img src={img1} width='600' height='600' className='dt-width-auto'></img>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-xs-12 pd5'>
              <div className='product__description'>
                <div className='product__comment'>
                  <h2>SẢN PHẨM LIÊN QUAN</h2>
                </div>
                <ul className='px-3 pt-3 lg:grid lg:grid-cols-3 lg:gap-2'>
                  {productList.map((item, index) => {
                    return (
                      <li key={item.id}>
                        <div className='flexbox-grid-default'>
                          <div className='abc flexbox-auto-100px'>
                            <Link to={`/${item.Category?.name}/${item.id}`}>
                              <img className='dt-width-100' width='100' height='100' src={item.image} />
                            </Link>
                          </div>
                          <div className='flexbox-content pd-l-10'>
                            <Link to={`/${item.Category?.name}/${item.id}`}>
                              <h3>{item.name}</h3>
                              {/* <p className='product-box-price-related clearfix flexbox-grid-default'>
                                {item.promotionId ? (
                                  <>
                                    <span className='price-new-related flexbox-content text-left'>
                                      {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        item.priceReduced
                                      )}
                                    </span>
                                    <del className='price-old-related flexbox-content'>
                                      {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        item.price
                                      )}
                                    </del>
                                  </>
                                ) : (
                                  <span className='price-new-related flexbox-content text-left'>
                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                      item.priceReduced
                                    )}
                                  </span>
                                )}
                              </p> */}
                            </Link>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            {/* <div className='col-lg-8 col-xs-12 pd5'>
              <CommentApp productId={product.NhomSanPhamId} authName={authState.hoTen && authState.hoTen} />
            </div> */}
            {/*   <div
              className='col-lg-8 col-xs-12 pd5'
              style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}
            >
              <h2>Sản phẩm vừa xem:</h2>
              {productItem &&
                productItem.map((item) => {
                  return (
                    <Link
                      to={`/${item.TheLoaiTen}/${item.NhomSanPhamId}/${item.SanPhamId}`}
                      style={{ margin: '0 5px' }}
                    >
                      <img src={`http://localhost:4000/${item.hinh}`} width={50} />
                    </Link>
                  )
                })}
            </div> */}
          </div>
          <div className='row'>
            <div className='col-lg-4 col-sm-12 col-xs-12 box__banner mb15'>
              <div className=' '>
                <div className='box-banner-index mb15 text-center'>
                  {/* <Link to='/category/t-shirts'>
                    <img src={img2} width='360' height='200' alt='banner 2' title='banner 2' />
                  </Link> */}
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-sm-12 col-xs-12 box__banner mb15'>
              <div className=' '>
                <div className='box-banner-index mb15 text-center'>
                  {/*  <Link to='/category/t-shirts'>
                    <img
                      src={img3}
                      className='dt-width-100 lazyloaded'
                      width='360'
                      height='200'
                      alt='banner 3'
                      title='banner 3'
                    />
                  </Link> */}
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-sm-12 col-xs-12 box__banner mb15'>
              <div className=' '>
                <div className='box-banner-index mb15 text-center'>
                  <Link to='/category/t-shirts'>
                    {/*   <img
                      src={img4}
                      className='dt-width-100 lazyloaded'
                      width='360'
                      height='200'
                      alt='banner 1'
                      title='banner 1'
                    /> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
