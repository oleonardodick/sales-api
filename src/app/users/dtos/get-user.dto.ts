import { ApiProperty } from '@nestjs/swagger';
import { Papel, Usuario } from '@prisma/client';

export class GetUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  papel: Papel;
  @ApiProperty()
  telefone: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  dataNascimento: Date;
  @ApiProperty()
  ativo: Boolean;
  @ApiProperty()
  enderecoId: string;

  constructor(usuario: Usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.papel = usuario.papel;
    this.telefone = usuario.telefone;
    this.avatarUrl = usuario.avatarUrl;
    this.dataNascimento = usuario.dataNascimento;
    this.ativo = usuario.ativo;
    this.enderecoId = usuario.enderecoId;
  }
}
