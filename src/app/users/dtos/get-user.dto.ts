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
  foto: string;
  @ApiProperty()
  rua: string;
  @ApiProperty()
  numero: number;
  @ApiProperty()
  cidade: string;
  @ApiProperty()
  cep: string;
  @ApiProperty()
  dataNascimento: Date;
  @ApiProperty()
  ativo: Boolean;

  constructor(usuario: Usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.papel = usuario.papel;
    this.telefone = usuario.telefone;
    this.foto = usuario.foto;
    this.rua = usuario.rua;
    this.numero = usuario.numero;
    this.cidade = usuario.cidadeId;
    this.cep = usuario.cep;
    this.dataNascimento = usuario.dataNascimento;
    this.ativo = usuario.ativo;
  }
}
