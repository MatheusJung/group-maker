export const REGEX_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/;
export const REGEX_USUARIO = /^[A-Za-z0-9]+$/;
export const REGEX_SENHA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const validacoes = {
  validarNome: (nome: string): boolean => {
    return REGEX_NOME.test(nome) && nome.trim().length >= 2;
  },

  validarUsuario: (usuario: string): boolean => {
    return REGEX_USUARIO.test(usuario);
  },

  validarSenha: (senha: string): boolean => {
    return REGEX_SENHA.test(senha);
  },
};
