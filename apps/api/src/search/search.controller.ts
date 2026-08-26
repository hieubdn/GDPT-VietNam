import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import type { SearchResponse } from './search.types';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query('q') q?: string, @Query('lang') lang?: string): SearchResponse {
    if (!q?.trim()) {
      return { results: [] };
    }

    const locale = this.searchService.resolveLocale(lang);
    return { results: this.searchService.search(q, locale) };
  }
}
