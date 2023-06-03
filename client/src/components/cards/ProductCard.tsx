import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Form,
  InputNumber,
  Popconfirm,
  Popover,
  Skeleton,
} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import useProductDelete from 'api-hooks/product/useProductDelete';
import placeholderImg from 'assets/images/placeholder.jpg';
import DrawerProduct from 'components/admin/Drawer/DrawerProduct';
import { useState } from 'react';
import { useAppDispatch } from 'services/store/configureStore';
import { addToCart } from 'services/store/reducers/cart';

interface Props {
  product?: Product;
  editMood?: boolean;
  loading?: boolean;
}

function ProductCard({ loading, product, editMood }: Props) {
  const [isDrawerProductOpen, setIsDrawerProductOpen] = useState(false);
  const [formWeight] = Form.useForm();
  const dispatch = useAppDispatch();
  const { productDelete, productDeleteLod } = useProductDelete();
  const [isEnterWeightOpen, setIsEnterWeightOpen] = useState(false);

  const onClosePopupWeight = () => {
    setIsEnterWeightOpen(false);
    formWeight.resetFields();
  };

  const onAddToCart = () => {
    if (product) {
      if (product.qtyType === 'piece') {
        dispatch(addToCart({ ...product, qty: 1 }));
      } else {
        setIsEnterWeightOpen(true);
      }
    }
  };
  const onDeleteProduct = () => {
    if (product) {
      productDelete({ productId: product._id });
    }
  };

  if (loading) return <ProductCardLoading />;

  if (editMood)
    return (
      <>
        <div className={`max-w-full w-36 h-36 group`} title={product?.name}>
          <div
            style={{
              backgroundImage: `url(${product?.image || placeholderImg}`,
            }}
            className="w-full h-full flex items-end justify-center overflow-hidden relative rounded bg-cover bg-center transition group-hover:brightness-50 bg-gray-200"
          >
            <div className="min-w-[100px] h-[37px] absolute top-[-6px] end-[-37px] bg-red-400 rotate-45 flex items-end justify-center font-bold text-white">
              {product?.price}
            </div>
            {product?.qtyType === 'weight' && (
              <div className="min-w-[100px] h-[37px] absolute top-[-6px] start-[-37px] bg-red-400 -rotate-45 flex items-end justify-center  font-bold text-white">
                KG
              </div>
            )}

            <div className="w-full px-1  font-semibold line-clamp-1 text-base truncate capitalize text-center bg-slate-100 bg-opacity-75">
              {product?.name}
            </div>
          </div>

          <div className="flex itmes-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 space-x-2 opacity-0 transition group-hover:opacity-100 group-hover:-translate-y-1/2 ">
            <Button
              type="ghost"
              size="large"
              icon={<EditOutlined className="text-2xl" />}
              className="text-white "
              title="Edit"
              onClick={() => setIsDrawerProductOpen(true)}
            />
            <Popconfirm title="Are you sure?" onConfirm={onDeleteProduct}>
              <Button
                type="ghost"
                size="large"
                icon={<DeleteOutlined className="text-2xl" />}
                className="text-white "
                title="Delete"
                loading={productDeleteLod}
              />
            </Popconfirm>
          </div>
        </div>
        <DrawerProduct
          open={isDrawerProductOpen}
          setOpen={setIsDrawerProductOpen}
          editProduct={product}
        />
      </>
    );

  return (
    <Popover
      open={isEnterWeightOpen}
      trigger="click"
      content={
        <div className="space-y-2 w-44">
          <h4>Enter weight</h4>
          <Form
            size="large"
            form={formWeight}
            autoFocus
            initialValues={{
              qty: 1,
            }}
            onFinish={(values: { qty: number }) => {
              // console.log({ values });
              if (product) {
                dispatch(addToCart({ ...product, qty: values.qty }));
                onClosePopupWeight();
              }
            }}
          >
            <FormItem
              name="qty"
              rules={[{ required: true, message: 'Please enter weight!' }]}
            >
              <InputNumber className="w-full" min={0.125} step={0.125} />
            </FormItem>
            <div className="space-x-2 text-end">
              <Button
                type="primary"
                ghost
                size="small"
                onClick={onClosePopupWeight}
              >
                Cancel
              </Button>
              <Button type="primary" size="small" htmlType="submit">
                Ok
              </Button>
            </div>
          </Form>
        </div>
      }
    >
      <Badge.Ribbon placement="end" text={product?.price} color={'#F77171'}>
        <Badge
          dot
          offset={[-72, 0]}
          status={
            product
              ? product?.stockAvailable > 10
                ? 'success'
                : product?.stockAvailable > 0
                ? 'warning'
                : 'error'
              : 'default'
          }
        >
          <div
            style={{
              backgroundImage: `url(${product?.image || placeholderImg}`,
            }}
            className={`max-w-full w-36 h-36 flex items-end justify-center overflow-hidden cursor-pointer relative rounded bg-cover bg-center border transition hover:shadow-md`}
            title={product?.name}
            onClick={onAddToCart}
          >
            {/* <div className="min-w-[100px] h-[37px] absolute top-[-6px] end-[-37px] bg-red-400 rotate-45 flex items-end justify-center  font-bold text-white">
            {product?.price}
          </div> */}
            {product?.qtyType === 'weight' && (
              <div className="min-w-[100px] h-[37px] absolute top-[-6px] start-[-37px] bg-slate-400 -rotate-45 flex items-end justify-center  font-bold text-white">
                KG
              </div>
            )}

            <div className="w-full px-1 font-semibold line-clamp-1 truncate capitalize  text-center bg-slate-100 bg-opacity-75">
              {product?.name}
            </div>
          </div>
        </Badge>
      </Badge.Ribbon>
    </Popover>
    // <Popover
    //   open={isEnterWeightOpen}
    //   trigger="click"
    //   content={
    //     <div className="space-y-2 w-44">
    //       <h4>Enter weight</h4>
    //       <Form
    //         size="large"
    //         form={formWeight}
    //         autoFocus
    //         initialValues={{
    //           qty: 1,
    //         }}
    //         onFinish={(values: { qty: number }) => {
    //           // console.log({ values });
    //           if (product) {
    //             dispatch(addToCart({ ...product, qty: values.qty }));
    //             onClosePopupWeight();
    //           }
    //         }}
    //       >
    //         <FormItem
    //           name="qty"
    //           rules={[{ required: true, message: 'Please enter weight!' }]}
    //         >
    //           <InputNumber className="w-full" min={0.125} step={0.125} />
    //         </FormItem>
    //         <div className="space-x-2 text-end">
    //           <Button
    //             type="primary"
    //             ghost
    //             size="small"
    //             onClick={onClosePopupWeight}
    //           >
    //             Cancel
    //           </Button>
    //           <Button type="primary" size="small" htmlType="submit">
    //             Ok
    //           </Button>
    //         </div>
    //       </Form>
    //     </div>
    //   }
    // >
    //   <Badge.Ribbon text={product?.price} color={'#F77171'}>
    //     <Card
    //       // style={{
    //       //   backgroundImage: `url(${product?.image || placeholderImg}`,
    //       // }}
    //       className={`max-w-full w-36 h-36 overflow-hidden`}
    //       // title={product?.name}
    //       // onClick={onAddToCart}
    //       size="small"
    //       // className="max-w-full w-36 "
    //       cover={
    //         <img
    //           src={product?.image || placeholderImg}
    //           alt=""
    //           className="h-28"
    //         />
    //       }
    //       hoverable
    //       type="inner"
    //     >
    //       {product?.qtyType === 'weight' && (
    //         <div className="min-w-[100px] h-[37px] absolute top-[-6px] start-[-37px] bg-slate-400 -rotate-45 flex items-end justify-center  font-bold text-white">
    //           KG
    //         </div>
    //       )}
    //       <Card.Meta title={product?.name} />

    //       {/* <div className="w-full px-1 font-medium truncate capitalize text-center bg-slate-100 bg-opacity-75">
    //         {product?.name}
    //       </div> */}
    //     </Card>
    //   </Badge.Ribbon>
    // </Popover>
  );
}

export default ProductCard;

const ProductCardLoading = () => {
  return (
    <div className="max-w-full flex items-end justify-center overflow-hidden rounded ">
      <Skeleton.Image active className="!w-36 !h-36" />
    </div>
  );
};
