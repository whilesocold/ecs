import { Component, ComponentClass } from "./Component";
import { Engine } from "./Engine";
import { Entity } from "./Entity";
interface Family {
    readonly entities: ReadonlyArray<Entity>;
    includesEntity(entity: Entity): boolean;
}
declare abstract class AbstractFamily implements Family {
    private readonly _engine;
    private readonly _include;
    private readonly _exclude;
    constructor(engine: Engine, include: ComponentClass<Component>[], exclude: ComponentClass<Component>[]);
    readonly engine: Engine;
    readonly abstract entities: ReadonlyArray<Entity>;
    includesEntity: (entity: Entity) => boolean;
}
declare class CachedFamily extends AbstractFamily {
    private _needEntityRefresh;
    private _entities;
    constructor(engine: Engine, include: ComponentClass<Component>[], exclude: ComponentClass<Component>[]);
    readonly entities: ReadonlyArray<Entity>;
    onEntityAdded(entity: Entity): void;
    onEntityRemoved(entity: Entity): void;
    onEntityChanged: (entity: Entity) => void;
}
declare class FamilyBuilder {
    private _engine;
    private _cached;
    private readonly _include;
    private readonly _exclude;
    constructor(engine?: Engine);
    include(...classes: ComponentClass<Component>[]): this;
    exclude(...classes: ComponentClass<Component>[]): this;
    changeEngine(engine: Engine): this;
    setCached(cached: boolean): void;
    build(): Family;
    buildCached(): CachedFamily;
}
export { AbstractFamily, Family, CachedFamily, FamilyBuilder };
