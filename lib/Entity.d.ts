/// <reference types="node" />
import { Component, ComponentClass } from "./Component";
import { EventEmitter } from "events";
declare type EntityChangeListener = (entity: Entity) => any;
declare enum EntityEvent {
    COMPONENT_ADDED = "EntityEvent.COMPONENT_ADDED",
    COMPONENT_REMOVED = "EntityEvent.COMPONENT_REMOVED",
}
declare class Entity extends EventEmitter {
    private _id;
    private readonly _components;
    private readonly _listeners;
    private readonly _componentClasses;
    id: string | number;
    isNew(): boolean;
    listComponents(): Component[];
    listComponentsWithTypes(): {
        component: Component;
        type: ComponentClass<Component>;
    }[];
    listComponentsWithTags(): Readonly<{
        tag: string;
        component: Component;
    }>[];
    hasComponent<T extends Component>(componentClass: ComponentClass<T>): boolean;
    getComponent<T extends Component>(componentClass: ComponentClass<T>): T;
    putComponent<T extends Component>(componentClass: ComponentClass<T>): T;
    removeComponent<T extends Component>(componentClass: ComponentClass<T>): void;
    cast<T extends Component>(component: Component | undefined | null, componentClass: ComponentClass<T>): component is T;
    addChangeListener(listener: EntityChangeListener): this;
    removeChangeListener(listener: EntityChangeListener): this;
}
export { Entity, EntityEvent, EntityChangeListener };
