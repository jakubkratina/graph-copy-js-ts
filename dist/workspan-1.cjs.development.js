'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var yargs = _interopDefault(require('yargs'));
var fs = _interopDefault(require('fs'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var find = function find(graph, entityId) {
  var entity = graph.entities.find(function (entity) {
    return entity.entity_id === entityId;
  });

  if (entity === undefined) {
    throw new Error("The entity " + entityId + " does not exist.");
  }

  return entity;
};
var findInboundLinks = function findInboundLinks(graph, entity) {
  return graph.links.filter(function (link) {
    return link.to === entity.entity_id;
  });
};
var findOutboundLinks = function findOutboundLinks(graph, entity) {
  return graph.links.filter(function (link) {
    return link.from === entity.entity_id;
  });
};
var parse = function parse(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};
var copy = function copy(graph, entityId) {
  var initial = find(graph, entityId);
  var initialClone = clone(graph, initial);
  copyInboundLinks(graph, initialClone, initial);
  copyDescendants(graph, initial, initialClone);
  return graph;
};

var copyDescendants = function copyDescendants(graph, entity, entityClone) {
  var links = findOutboundLinks(graph, entity);

  if (links.length) {
    links.forEach(function (link) {
      var descendant = find(graph, link.to);
      var descendantClone = clone(graph, descendant);
      graph.links.push({
        from: entityClone.entity_id,
        to: descendantClone.entity_id
      });
      copyDescendants(graph, descendant, descendantClone);
    });
  }
};

var copyInboundLinks = function copyInboundLinks(graph, entity, ancestor) {
  findInboundLinks(graph, ancestor).forEach(function (link) {
    graph.links.push({
      from: link.from,
      to: entity.entity_id
    });
  });
}; // Note: in the production, I'd expect a store/DB call instead of getting the last element from the graph array


var generateId = function generateId(graph) {
  return graph.entities[graph.entities.length - 1].entity_id + 1;
};

var clone = function clone(graph, entity) {
  var clone = _extends({}, entity, {}, {
    entity_id: generateId(graph)
  });

  graph.entities.push(clone);
  return clone;
};

var input = function input(file, entity) {
  if (!fs.existsSync(file)) {
    throw new Error("The input file " + file + " does not exist.");
  }

  var graph = parse(file);

  if (!find(graph, entity)) {
    throw new Error("The entity " + entity + " does not exist.");
  }

  return graph;
};

yargs.usage('Usage: <inputfile> <entityid>').demandCommand(2);
var file = yargs.argv._[0];
var entityId =
/*#__PURE__*/
parseInt(yargs.argv._[1]);
var graph =
/*#__PURE__*/
copy(
/*#__PURE__*/
input(file, entityId), entityId);
console.log(graph);
//# sourceMappingURL=workspan-1.cjs.development.js.map
