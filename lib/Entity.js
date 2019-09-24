"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var EntityEvent;
(function (EntityEvent) {
    EntityEvent["COMPONENT_ADDED"] = "EntityEvent.COMPONENT_ADDED";
    EntityEvent["COMPONENT_REMOVED"] = "EntityEvent.COMPONENT_REMOVED";
})(EntityEvent || (EntityEvent = {}));
exports.EntityEvent = EntityEvent;
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._id = null;
        _this._components = {};
        _this._listeners = [];
        _this._componentClasses = {};
        return _this;
    }
    Object.defineProperty(Entity.prototype, "id", {
        get: function () {
            if (this._id === null) {
                throw new Error("Cannot retrieve an ID when is null.");
            }
            return this._id;
        },
        set: function (value) {
            if (value === null || value === undefined) {
                throw new Error("Must set a non null value when setting an entity id.");
            }
            if (this._id !== null) {
                throw new Error("Entity id is already set as \"" + this._id + "\".");
            }
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.isNew = function () {
        return this._id === null;
    };
    Entity.prototype.listComponents = function () {
        var _this = this;
        return Object.keys(this._components).map(function (i) { return _this._components[i]; });
    };
    Entity.prototype.listComponentsWithTypes = function () {
        var _this = this;
        return Object.keys(this._components).map(function (i) { return ({
            component: _this._components[i],
            type: _this._componentClasses[i]
        }); });
    };
    Entity.prototype.listComponentsWithTags = function () {
        var _this = this;
        return Object.keys(this._components).map(function (tag) {
            return Object.freeze({
                tag: tag,
                component: _this._components[tag]
            });
        });
    };
    Entity.prototype.hasComponent = function (componentClass) {
        var tag = componentClass.tag || componentClass.name;
        var component = this._components[tag];
        if (!component)
            return false;
        if (!this.cast(component, componentClass)) {
            throw new Error("There are multiple classes with the same tag or name \"" + tag + "\".\nAdd a different property \"tag\" to one of them.");
        }
        return true;
    };
    Entity.prototype.getComponent = function (componentClass) {
        var tag = componentClass.tag || componentClass.name;
        var component = this._components[tag];
        if (!component) {
            throw new Error("Cannot get component \"" + tag + "\" from entity.");
        }
        if (!this.cast(component, componentClass)) {
            throw new Error("There are multiple classes with the same tag or name \"" + tag + "\".\nAdd a different property \"tag\" to one of them.");
        }
        return component;
    };
    Entity.prototype.putComponent = function (componentClass) {
        var tag = componentClass.tag || componentClass.name;
        var component = this._components[tag];
        if (component) {
            if (!this.cast(component, componentClass)) {
                throw new Error("There are multiple classes with the same tag or name \"" + tag + "\".\nAdd a different property \"tag\" to one of them.");
            }
            delete this._components[tag];
            delete this._componentClasses[tag];
        }
        var newComponent = new componentClass();
        this._components[tag] = newComponent;
        this._componentClasses[tag] = componentClass;
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(this);
            this.emit(EntityEvent.COMPONENT_ADDED, component);
        }
        return newComponent;
    };
    Entity.prototype.removeComponent = function (componentClass) {
        var tag = componentClass.tag || componentClass.name;
        var component = this._components[tag];
        if (!component) {
            throw new Error("Component of tag \"" + tag + "\".\nDoes not exists.");
        }
        if (!this.cast(component, componentClass)) {
            throw new Error("There are multiple classes with the same tag or name \"" + tag + "\".\nAdd a different property \"tag\" to one of them.");
        }
        delete this._components[tag];
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(this);
            this.emit(EntityEvent.COMPONENT_REMOVED, component);
        }
    };
    Entity.prototype.cast = function (component, componentClass) {
        return !!(component && component instanceof componentClass);
    };
    Entity.prototype.addChangeListener = function (listener) {
        var index = this._listeners.indexOf(listener);
        if (index === -1) {
            this._listeners.push(listener);
        }
        return this;
    };
    Entity.prototype.removeChangeListener = function (listener) {
        var index = this._listeners.indexOf(listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
        return this;
    };
    return Entity;
}(events_1.EventEmitter));
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map