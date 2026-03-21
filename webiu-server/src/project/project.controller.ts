import { Controller, Get, Query, Header } from '@nestjs/common';
import { ProjectService } from './project.service';
import { GetProjectsDto } from './dto/get-projects.dto';

@Controller('api/projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('projects')
  @Header('Cache-Control', 'public, max-age=300')
  async getAllProjects(@Query() query: GetProjectsDto) {
    return this.projectService.getAllProjects(query.page, query.limit);
  }

  @Get('search')
  @Header('Cache-Control', 'public, max-age=300')
  async searchProjects(@Query('q') query: string) {
    if (!query) {
      return {
        total: 0,
        repositories: [],
      };
    }

    return this.projectService.searchProjects(query);
  }
}

@Controller('api/issues')
export class IssuesController {
  constructor(private projectService: ProjectService) {}

  @Get('issuesAndPr')
  @Header('Cache-Control', 'public, max-age=300')
  async getIssuesAndPr(@Query('org') org: string, @Query('repo') repo: string) {
    return this.projectService.getIssuesAndPr(org, repo);
  }
}
