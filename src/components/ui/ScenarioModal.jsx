import React from 'react';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { Button } from './Button.jsx';
import { Modal } from './Modal.jsx';

const typeIcon = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: TriangleAlert,
  info: Info,
};

export function ScenarioModal({ title, boundary, scenarios, onSelect, onClose }) {
  return (
    <Modal title="Variasi Halaman" kicker={title} onClose={onClose}>
      <div className="scenario-modal-body">
        <p>Pilih variasi state untuk halaman aktif{boundary ? `: ${boundary}` : ''}.</p>
        <div className="scenario-list">
          {scenarios.map((scenario) => {
            const Icon = typeIcon[scenario.type] ?? Info;
            return (
              <button
                className={`scenario-option ${scenario.type}`}
                type="button"
                key={`${scenario.boundary}-${scenario.title}-${scenario.message}`}
                onClick={() => onSelect(scenario)}
              >
                <Icon size={20} aria-hidden="true" />
                <span>
                  <b>{scenario.title}</b>
                  <small>{scenario.boundary}</small>
                  <em>{scenario.message}</em>
                </span>
              </button>
            );
          })}
        </div>
        <div className="form-actions">
          <Button variant="secondary" onClick={onClose}>Tutup</Button>
        </div>
      </div>
    </Modal>
  );
}

export function ScenarioBanner({ scenario, onClear }) {
  if (!scenario) return null;
  const Icon = typeIcon[scenario.type] ?? Info;
  const shouldShowMessage = scenario.message && scenario.message !== scenario.title;

  return (
    <div className={`scenario-banner ${scenario.type}`}>
      <Icon size={22} aria-hidden="true" />
      <div>
        <strong>{scenario.title}</strong>
        {shouldShowMessage ? <p>{scenario.message}</p> : null}
      </div>
      <Button variant="ghost" size="sm" onClick={onClear}>Reset</Button>
    </div>
  );
}
