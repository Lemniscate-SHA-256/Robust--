@{%
const moo = require("moo");

const lexer = moo.compile({
  ws: { match: /\s+/, lineBreaks: true },
  lambda: 'λ',
  dot: '.',
  lparen: '(',
  rparen: ')',
  variable: /[a-zA-Z]+/,
});

// Skip whitespace
lexer.next = (next => () => {
  let tok;
  while ((tok = next.call(lexer)) && tok.type === 'ws');
  return tok;
})(lexer.next);
%}

@lexer lexer

# Root rule: Parses a term and returns the AST
main -> term

# Term: Applications or single terms (abstractions/variables/parentheses)
term -> single_term terms {%
  ([head, tail]) => tail.reduce(
    (func, arg) => ({ type: "App", func, arg }),
    head
  )
%}

# Helper for zero or more terms (used in applications)
terms -> single_term terms {%
  ([head, tail]) => [head, ...tail]
%}
  | empty {% () => [] %}

# Single terms (abstractions, variables, or parentheses)
single_term -> abstraction
  | variable
  | lparen term rparen {%
    ([, t, ]) => t
  %}

# Abstraction: λx. body
abstraction -> lambda variable dot term {%
  ([, param, , body]) => ({
    type: "Lambda",
    param: param.value,
    body
  })
%}

# Variable: x, y, etc.
variable -> variable {%
  ([v]) => ({ type: "Var", name: v.value })
%}