// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["term"]},
    {"name": "term", "symbols": ["single_term", "terms"], "postprocess": 
        ([head, tail]) => tail.reduce(
          (func, arg) => ({ type: "App", func, arg }),
          head
        )
        },
    {"name": "terms", "symbols": ["single_term", "terms"], "postprocess": 
        ([head, tail]) => [head, ...tail]
        },
    {"name": "terms", "symbols": ["empty"], "postprocess": () => []},
    {"name": "single_term", "symbols": ["abstraction"]},
    {"name": "single_term", "symbols": ["variable"]},
    {"name": "single_term", "symbols": ["lparen", "term", "rparen"], "postprocess": 
        ([, t, ]) => t
          },
    {"name": "abstraction", "symbols": ["lambda", "variable", "dot", "term"], "postprocess": 
        ([, param, , body]) => ({
          type: "Lambda",
          param: param.value,
          body
        })
        },
    {"name": "variable", "symbols": ["variable"], "postprocess": 
        ([v]) => ({ type: "Var", name: v.value })
        }
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
