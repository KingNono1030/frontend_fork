'use client'

import { Button } from '@/components/common/button'
import { CheckboxInput } from '@/components/common/input'
import { Text } from '@/components/common/text'
import { Pagination } from '@/components/shared/pagination'

import { useCheckboxSelection } from '@/hooks/useCheckboxSelection'
import { usePagination } from '@/hooks/usePagination'

import { mock } from '../mock'

const ITEMS_PER_PAGE = 10

export default function LikePosts(): JSX.Element {
  const {
    currentPage,
    pageButtons,
    hasNextPageGroup,
    hasPreviousPageGroup,
    goToPage,
    goToNextPageGroup,
    goToPreviousPageGroup,
  } = usePagination({
    totalItems: mock.length,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const currentData = mock.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const {
    selectedItems,
    handleCheckboxChange,
    handleSelectAll,
    isAllSelected,
  } = useCheckboxSelection({
    totalItems: mock.length,
    itemsPerPage: ITEMS_PER_PAGE,
    currentPage,
  })

  return (
    <div className='py-34'>
      <div className='flex w-954 flex-row border-b-1 border-t-1 border-b-gray-300 border-t-common-black px-20 py-12'>
        <div className='flex w-554 flex-col items-center'>
          <Text.Title variant='title2' color='gray800'>
            제목
          </Text.Title>
        </div>
        <div className='flex w-120 flex-col items-center'>
          <Text.Title variant='title2' color='gray800'>
            유형
          </Text.Title>
        </div>
        <div className='flex w-120 flex-col items-center'>
          <Text.Title variant='title2' color='gray800'>
            작성일
          </Text.Title>
        </div>
        <div className='flex w-120 flex-col items-center'>
          <Text.Title variant='title2' color='gray800'>
            조회
          </Text.Title>
        </div>
      </div>
      <div className='min-h-490'>
        {currentData.map((post, index) => {
          const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index
          return (
            <div
              key={index}
              className='flex w-954 flex-row items-center border-b-1 border-b-gray-300 px-20 py-12'
            >
              <CheckboxInput
                variant='checkbox'
                checked={selectedItems.includes(globalIndex)}
                onChange={() => handleCheckboxChange(index)}
              />
              <div className='flex w-526 flex-row'>
                <Text.Body variant='body2' color='gray800' weight='500'>
                  {post.Title}
                </Text.Body>
                <Text.Title
                  variant='title2'
                  color='red500'
                  weight='700'
                  className='pl-2'
                >
                  [{post.Comments}]
                </Text.Title>
              </div>
              <div className='flex w-120 flex-row justify-center'>
                <Text.Body variant='body2' color='gray800' weight='500'>
                  {post.Category}
                </Text.Body>
              </div>
              <div className='flex w-120 flex-row justify-center'>
                <Text.Body variant='body2' color='gray800' weight='500'>
                  {post.Date}
                </Text.Body>
              </div>
              <div className='flex w-120 flex-row justify-center'>
                <Text.Body variant='body2' color='gray800' weight='500'>
                  {post.Views}
                </Text.Body>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex flex-row justify-between py-20'>
        <CheckboxInput
          variant='checkbox'
          label='전체선택'
          checked={isAllSelected}
          onChange={handleSelectAll}
        />
        <Button>삭제</Button>
      </div>
      <Pagination
        currentPage={currentPage}
        pageButtons={pageButtons}
        hasNextPageGroup={hasNextPageGroup}
        hasPreviousPageGroup={hasPreviousPageGroup}
        goToPage={goToPage}
        goToNextPageGroup={goToNextPageGroup}
        goToPreviousPageGroup={goToPreviousPageGroup}
      />
    </div>
  )
}
