import * as migration_20260422_182301_add_article_in_collection from './20260422_182301_add_article_in_collection';
import * as migration_20260422_182926_add_textarea_content_summary_in_article from './20260422_182926_add_textarea_content_summary_in_article';

export const migrations = [
  {
    up: migration_20260422_182301_add_article_in_collection.up,
    down: migration_20260422_182301_add_article_in_collection.down,
    name: '20260422_182301_add_article_in_collection',
  },
  {
    up: migration_20260422_182926_add_textarea_content_summary_in_article.up,
    down: migration_20260422_182926_add_textarea_content_summary_in_article.down,
    name: '20260422_182926_add_textarea_content_summary_in_article'
  },
];
