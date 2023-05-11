import { css, cx } from '@emotion/css';
import { Segmented } from 'antd';
import { useAppSelector } from 'services/store/configureStore';

function Categories({
  currentCategory,
  setCurrentCategory,
}: {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}) {
  const CategoriesStyles = css`
    .ant-segmented-group {
      flex-wrap: wrap;

      .ant-segmented-item {
        min-width: max-content;
      }
      .ant-segmented-item-selected {
      }
    }
  `;
  const categories = useAppSelector(s => s.category.list);

  return (
    <Segmented
      block
      size="large"
      className={cx(
        'w-full bg-slate-100 flex justify-center sticky top-0 z-10 shadow-md font-medium capitalize',
        CategoriesStyles
      )}
      options={['all', ...categories]}
      defaultValue={currentCategory}
      onChange={category => setCurrentCategory(category.toString())}
    />
  );
}

export default Categories;
