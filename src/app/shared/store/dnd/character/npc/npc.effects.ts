import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NpcActions} from './npc.actions';
import {tap} from 'rxjs/operators';
import {DialogService} from 'src/app/shared/layouts/dialog/dialog.service';
import {dontDispatch} from 'src/app/shared/store/util/effects';
import {NpcDetailComponent} from 'src/app/components/npc/npc-detail/npc-detail.component';

@Injectable()
export class NpcEffects {

  onOpenEditNPCCharacter = createEffect(() => this.actions$.pipe(
    ofType(NpcActions.OpenEditNPC),
    tap(action => this.dialogs.open(NpcDetailComponent))
  ), dontDispatch);

  onEditNPCCharacter = createEffect(() => this.actions$.pipe(
    ofType(NpcActions.EditNPC, NpcActions.CloseEditNPC),
    tap(action => this.dialogs.close())
  ), dontDispatch);

  constructor(private actions$: Actions, private dialogs: DialogService) {
  }
}
