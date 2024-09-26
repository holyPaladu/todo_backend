import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service.js';
import { Get, Post, Body, Put, Delete } from '@nestjs/common';
import { Todo } from './todo.entity.js';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.findOne(+id);
  }

  @Post()
  create(@Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoService.update(+id, todo);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.remove(+id);
  }
}
