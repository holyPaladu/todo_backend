import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity.js';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  create(todo: Partial<Todo>): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async update(id: number, updateData: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update(id, updateData);
    return this.todoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
