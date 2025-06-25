import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { tagType } from './tagType'
import {commentType} from './commentType'

export const schema = {
  types: [blockContentType, commentType, categoryType, postType, authorType, tagType],
}
